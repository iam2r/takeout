interface Script {
  id?: string
  src: string
  async?: boolean
  [key: string]: string | undefined | boolean
}

export const loadScripts = async (
  scripts: Script | Script[],
  parallel = false
): Promise<HTMLScriptElement[]> => {
  scripts = Array.isArray(scripts) ? scripts : [scripts]
  const loadScript = (script: Script): Promise<HTMLScriptElement> =>
    new Promise((resolve) => {
      const $script = document.createElement('script')
      const $childNode =
        document.getElementsByTagName('script')[0] ||
        document.body ||
        document.head

      for (const key in script) {
        if (typeof script[key] === 'string') {
          $script.setAttribute(key, script[key] as string)
        }
        if (key === 'async') {
          $script.async = script[key] as boolean
        }
      }
      $childNode.parentNode &&
        $childNode.parentNode.insertBefore($script, $childNode)

      if (
        Object.keys(script).includes('for') &&
        Object.keys(script).includes('event')
      ) {
        resolve($script)
      }

      $script.onload = () => {
        script.remove && $childNode.parentNode?.removeChild($script)
        resolve($script)
      }
    })

  if (parallel) {
    return Promise.all(scripts.map((script) => loadScript(script)))
  } else {
    const result = []
    for (let index = 0; index < scripts.length; index++) {
      result[index] = await loadScript(scripts[index])
    }
    return result
  }
}

export const loadJson = (url: string): Promise<Record<string, unknown>> => {
  return new Promise((resolve) => {
    const xhr = new XMLHttpRequest()
    xhr.open('GET', url)
    xhr.send()

    xhr.onreadystatechange = () => {
      if (xhr.readyState == 4 && xhr.status == 200) {
        resolve(JSON.parse(xhr.response))
      }
    }
  })
}

export const loadSound = (url: string): Promise<HTMLAudioElement> => {
  return new Promise((resolve, reject) => {
    const media = new Audio()
    media.oncanplay = () => {
      resolve(media)
    }

    media.onerror = () => {
      reject('load error:' + url)
    }
    media.src = url

    if (navigator.userAgent.match(/iPhone|iPod|iPad/i) != null) {
      setTimeout(() => {
        //兼容ios不触发oncanplay
        media.load()
      }, 0)
    }
  })
}

export const loadImage = (
  url: string,
  isBlob = false
): Promise<HTMLImageElement | string> => {
  return new Promise((resolve, reject) => {
    if (isBlob) {
      const xhr = new XMLHttpRequest()
      xhr.open('GET', url, true)
      xhr.responseType = 'blob'
      xhr.onreadystatechange = () => {
        if (xhr.readyState == 4 && xhr.status == 200) {
          resolve(URL.createObjectURL(xhr.response))
        }
      }
      xhr.send()
    } else {
      const img = new Image()
      img.onload = () => {
        resolve(img)
      }

      img.onerror = () => {
        reject('load error:' + url)
      }

      img.src = url
    }
  })
}

export const loadImage2Blob = (url: string): Promise<string> => {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest()
    xhr.open('GET', url, true)
    xhr.onload = function () {
      if (this.readyState == 4 && this.status == 200) {
        const blob = URL.createObjectURL(this.response)
        resolve(blob)
      } else {
        reject()
      }
    }
    xhr.responseType = 'blob'
    xhr.send()
  })
}
