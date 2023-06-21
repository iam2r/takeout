import { AppModule, DeviceType } from '@/views/tl/store/modules/app'
import { Component, Vue } from 'vue-property-decorator'
import { VNode } from 'vue/types/umd'
import Floating from './sections/floating'
import SectionAbout from './sections/about'
import SectionBusiness from './sections/business'
import SectionContact from './sections/contact'
import SectionDownload from './sections/download'
import SectionHome from './sections/home'
import SectionPartners from './sections/partners'
import SectionRider from './sections/rider'
import style from './style.module.scss'

@Component({
  name: 'Home'
})
export default class extends Vue {
  render(): VNode {
    return (
      <div>
        <section id="section-home" class={style['section-home']}>
          <SectionHome />
        </section>
        <section id="section-business">
          <SectionBusiness />
        </section>
        <section id="section-rider">
          <SectionRider />
        </section>
        <section id="section-download">
          <SectionDownload />
        </section>
        <section id="section-partners">
          <SectionPartners />
        </section>
        <section id="section-about">
          <SectionAbout />
        </section>
        <section id="section-contact">
          <SectionContact />
        </section>
        {AppModule.device === DeviceType.Desktop && <Floating />}
      </div>
    )
  }
}
