import { AppModule, MenusType, menus } from '@/views/tl/store/modules/app'
import Animation from '@/utils/Animation'
import settings from '@/views/tl/settings'
export const animation: Record<'toMenu', Animation | null> = {
  toMenu: null
}

export const calcMenuTop = (menu: MenusType): number => {
  const from = document.documentElement.scrollTop || document.body.scrollTop
  const rectTop =
    document.querySelector('#section-' + menu)?.getBoundingClientRect().top || 0
  const diff =
    (settings.fixedHeader
      ? document.querySelector('#section-header')?.getBoundingClientRect()
          .height
      : 0) || 0
  const maxTop = document.body.scrollHeight - document.body.clientHeight
  return Math.min(maxTop, menu === 'home' ? 0 : rectTop + from - diff)
}

export const scroll2Menu = (menu: MenusType, offset = 0): void => {
  try {
    if (animation.toMenu && animation.toMenu.isAnimating) return
    const from = document.documentElement.scrollTop || document.body.scrollTop
    const top = calcMenuTop(menu)
    animation.toMenu = new Animation({ top: from })
      .to({ top }, 300)
      .on(Animation.EventType.UPDATE, (target) => {
        window.scrollTo(0, target.top + offset)
      })
      .on(Animation.EventType.COMPLETE, () => {
        AppModule.SET_ACTIVEMENU(menu)
      })
  } catch (error) {}
}

export const setCurrentMenu = (): void => {
  /**
   * 实时计算菜单激活项目
   */
  const menu = menus
    .map((menuKey) => ({
      menu: menuKey,
      top: calcMenuTop(menuKey)
    }))
    .reverse()
    .find((it) => it.top < window.scrollY + 1)?.menu
  menu && AppModule.SET_ACTIVEMENU(menu)
}
