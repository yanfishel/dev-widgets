
export const openExternalLink = (url: string) => {
  window.electronAPI.openExternal(url)
}