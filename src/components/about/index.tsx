import {useEffect, useState} from "react";

import {LogoIcon} from "@/assets";
import './style.css'


export const About = () => {

  const [versions, setVersions] = useState<string[][]>([])
  const [packageJson, setPackageJson] = useState<IPackageJson>({})


  const getInfo = async () => {
    const data = await window.electronAPI.getAppInfo()
    const {packageJson, versions} = data
    if(packageJson) setPackageJson(packageJson)
    if(versions) setVersions(versions)
  }

  const openLink = (link: string) => {
    window.electronAPI.openExternal(link)
  }


  useEffect(()=>{
    getInfo()
  }, [])

  return (
    <>
      <div id="icon">
        <LogoIcon />
      </div>

      <div id="name">
        { packageJson.productName ?? ''} <span>{ packageJson.version ?? '0'}</span>
      </div>

      <div id="description">{ packageJson.description ?? '' }</div>

      <div className="row">
        { packageJson.homepage &&
          <div id="homepage">
            <a href='#' onClick={() => openLink(packageJson.homepage)}>Homepage</a>
          </div>
        }

        { packageJson.author && (packageJson.author?.name || packageJson.author?.email) &&
          <div id="author">
            Author: <a href={ `mailto:${ packageJson.author.email }` } >@{packageJson.author.name}</a>
          </div>
        }
      </div>

      { versions.length > 0 &&
        <table id="versions">
          { versions.map(([name, value], i) => <tr key={i}><td>{name}</td><td>:{value}</td></tr>) }
        </table>
      }

      { packageJson.bugs?.url &&
        <div id="bugs">
          <a href='#' onClick={() => openLink(packageJson.bugs.url)}>Report a bug</a>
        </div>
      }

      <div className="credits">
        <div id="icons-credit">Weather <a href="#" onClick={() => openLink('https://open-meteo.com')}>Open meteo</a></div>
        <div id="icons-credit">Weather icons <a href="#" onClick={() => openLink('https://www.figma.com/@pitsch')}>@pitsch</a></div>
      </div>
    </>
  )
}

export default About;