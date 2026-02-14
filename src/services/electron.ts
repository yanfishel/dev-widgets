import {dialog, shell} from "electron";

/**
 * Opens an external link in the default web browser.
 *
 * This function attempts to open the specified URL in the system's default browser.
 * If an error occurs during the process, it logs the error to the console and displays
 * an error dialog box to notify the user.
 *
 * @param {string} url - The external URL to be opened.
 * @throws Will log an error message and display an error dialog if the operation fails.
 */
export const openExternalLink = async (url:string) => {
  try {
    await shell.openExternal(url)
  } catch (error) {
    console.error('Error opening external link:', error)
    dialog.showErrorBox('Error opening external link', `${error}`)
  }
}


/**
 * Asynchronously retrieves the application's package.json file and version information for specified dependencies.
 *
 * @async
 * @function
 * @returns {Promise<{packageJson: I_PackageJson, versions: Array<[string, string]>}>}
 *          A promise that resolves to an object containing the package.json data and version information for
 *          'electron', 'chrome', 'node', and 'v8'.
 * @throws {Error} Logs an error to the console if the operation fails.
 */
export const getPackageJson = async () => {
  try {
    const versions = ['electron', 'chrome', 'node', 'v8'].map(e => [e, process.versions[e]]);
    const packageJson:I_PackageJson = await import('../../package.json')
    return { packageJson, versions }
  } catch (error) {
    console.error('Error getting app info:', error)
  }
}
