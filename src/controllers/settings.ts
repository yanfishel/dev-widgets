import {dialog, screen} from "electron";
import * as path from "node:path";
import {existsSync, mkdirSync, readFileSync, writeFileSync,} from 'node:fs'

import {config} from "@/config";
import {APP_SETTINGS_DEFAULT, APP_WIDTH} from "@/constants";
import {T_AppSettings} from "@/types/app";


/**
 * Singleton class responsible for managing application settings.
 *
 * This class handles loading, reading, and saving application settings
 * using a JSON configuration file. If the settings file does not exist,
 * it creates one based on default settings and the primary display's dimensions.
 *
 * Properties:
 * - `instance` (static): Stores the single instance of the class.
 * - `#appSetings`: Private member storing the cached settings object.
 *
 * Methods:
 * - `getInstance()`: Retrieves the singleton instance of the AppSettings class.
 * - `readAppSettings()`: Reads and parses the application settings from the file system.
 *   If the file is missing, initializes it with default settings.
 * - `save(settings)`: Saves the provided settings object to the settings file.
 * - `settings`: Getter that lazily reads settings from the file if not cached
 *   and returns the cached settings object.
 */
class AppSettings {
  static instance: AppSettings | null = null

  #appSetings: T_AppSettings | null = null

  static getInstance() {
    if (!AppSettings.instance) {
      AppSettings.instance = new AppSettings()
    }
    return AppSettings.instance
  }

  private readAppSettings() {
    try {
      const settingsDataRaw = readFileSync(config.appSettingsPath, 'utf-8')
      return JSON.parse(settingsDataRaw)
    } catch (error) {
      // If the app-settings.json file is missing, initialize it from the public template
      // or create an empty config so the app can start gracefully.
      if (error && error.code === 'ENOENT') {
        try {
          const targetDir = path.dirname(config.appSettingsPath)
          if (!existsSync(targetDir)) {
            mkdirSync(targetDir, { recursive: true })
          }

          let initial = {...APP_SETTINGS_DEFAULT}

          const primaryDisplay = screen.getPrimaryDisplay()
          if(primaryDisplay) {
            const { width, height } = primaryDisplay.workAreaSize
            initial = {
              ...initial,
              height,
              x: width - APP_WIDTH.LARGE
            }
          }
          writeFileSync(config.appSettingsPath, JSON.stringify(initial, null, 2))
          return initial
        } catch (initErr) {
          dialog.showErrorBox('Failed to initialize settings', `${initErr}`)
          throw initErr
        }
      }
      dialog.showErrorBox('Failed to read data', `${error}`)
      throw error
    }
  }

  public save(settings: T_AppSettings) {
    try {
      writeFileSync(config.appSettingsPath, JSON.stringify(settings, null, 2))
      this.#appSetings = settings
    } catch (err) {
      dialog.showErrorBox('Error writing to data', `${err}`)
    }
  }

  get settings() {
    if(!this.#appSetings){
      this.#appSetings = this.readAppSettings()
    }
    return this.#appSetings
  }
}

const appSettings = AppSettings.getInstance()
export default appSettings