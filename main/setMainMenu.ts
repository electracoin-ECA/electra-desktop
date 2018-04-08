import { Menu, MenuItemConstructorOptions } from 'electron'

export default function(onQuit: MenuItemConstructorOptions['click']): void {
  const mainMenu: MenuItemConstructorOptions[] = [
    {
      label: 'Electra Desktop',
      submenu: [
        {
          // label: 'About Electra Desktop',
          role: 'about',
        },
        {
          type: 'separator',
        },
        {
          click: onQuit,
          role: 'quit',
        },
      ] as MenuItemConstructorOptions[],
    },
    {
      label: 'Edit',
      submenu: [
        { role: 'undo' },
        { role: 'redo' },
        { type: 'separator' },
        { role: 'cut' },
        { role: 'copy' },
        { role: 'paste' },
        { role: 'selectall' },
      ] as MenuItemConstructorOptions[],
    },
  ]

  Menu.setApplicationMenu(Menu.buildFromTemplate(mainMenu))
}
