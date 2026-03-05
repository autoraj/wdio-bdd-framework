import type { Options } from '@wdio/types'

export const config: Options.Testrunner = {
  runner: 'local',

  specs: ['./features/**/*.feature'],

  maxInstances: 1,

  framework: 'cucumber',

  reporters: ['spec'],

  cucumberOpts: {
    require: ['./step-definitions/**/*.ts'],
    timeout: 60000
  },

  services: ['chromedriver', 'safaridriver', 'appium'],

  capabilities: [
    // Desktop Chrome
    {
      platformName: 'Windows',
      browserName: 'chrome'
    },

    // Desktop Safari (Mac only)
    {
      platformName: 'macOS',
      browserName: 'safari'
    },

    // Android Chrome (via Appium)
    {
      platformName: 'Android',
      'appium:deviceName': 'Android Emulator',
      'appium:automationName': 'UiAutomator2',
      'appium:browserName': 'Chrome'
    },

    // iOS Safari (via Appium)
    {
      platformName: 'iOS',
      'appium:deviceName': 'iPhone Simulator',
      'appium:automationName': 'XCUITest',
      'appium:browserName': 'Safari'
    }
  ]
}
