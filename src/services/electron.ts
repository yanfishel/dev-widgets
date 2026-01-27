import {dialog, shell} from "electron";

export const openExternalLink = async (url:string) => {
  try {
    await shell.openExternal(url)
  } catch (error) {
    console.error('Error opening external link:', error)
    dialog.showErrorBox('Error opening external link', `${error}`)
  }
}

export const getPackageJson = async () => {
  try {
    const versions = ['electron', 'chrome', 'node', 'v8'].map(e => [e, process.versions[e]]);
    const packageJson:IPackageJson = await import('../../package.json')
    return { packageJson, versions }
  } catch (error) {
    console.error('Error getting app info:', error)
  }
}
