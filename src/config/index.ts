import {app} from "electron";
import * as path from "node:path";
import { homedir } from "os";

/**
 * Configuration object for the application.
 *
 * @property {string} applicationName
 *   The name of the application. Defaults to 'Desktop Widgets' if no name is provided by the app object.
 *
 * @property {string} appSettingsDir
 *   The directory path where the application settings will be stored. This is located in the user's documents folder under 'desktop-widgets'.
 *
 * @property {string} appSettingsPath
 *   The full file path to the application settings JSON file. This path is derived from the 'desktop-widgets' directory in the user's documents folder.
 *
 * @property {string} iconPath
 *   The full path to the application's icon file. The icon is located in the 'public/images' directory of the application's root path.
 *
 * @property {string} homePath
 *   The home directory path of the executing user.
 */
export const config = {
  applicationName: app.name || app.getName() || 'Desktop Widgets',

  appSettingsDir: path.join( app.getPath('documents'), 'desktop-widgets'),
  appSettingsPath: path.join( app.getPath('documents'), 'desktop-widgets', 'app-settings.json'),

  iconPath: path.join(app.getAppPath(), 'public', 'images', 'icon-256.png'),
  homePath: path.join(homedir())
}