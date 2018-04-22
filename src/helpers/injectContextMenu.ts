import { remote } from 'electron'

const { Menu, MenuItem } = remote

/**
 * @see https://electronjs.org/docs/api/menu#render-process
 */
export default function(): void {
  const editableContextMenu = new Menu()
  editableContextMenu.append(new MenuItem({
    label: 'Undo',
    role: 'undo',
  }))
  editableContextMenu.append(new MenuItem({
    label: 'Redo',
    role: 'redo',
  }))
  editableContextMenu.append(new MenuItem({
    type: 'separator',
  }))
  editableContextMenu.append(new MenuItem({
    label: 'Cut',
    role: 'cut',
  }))
  editableContextMenu.append(new MenuItem({
    label: 'Copy',
    role: 'copy',
  }))
  editableContextMenu.append(new MenuItem({
    label: 'Paste',
    role: 'paste',
  }))
  editableContextMenu.append(new MenuItem({
    type: 'separator',
  }))
  editableContextMenu.append(new MenuItem({
    label: 'Select all',
    role: 'selectall',
  }))

  const selectableContextMenu = new Menu()
  selectableContextMenu.append(new MenuItem({
    label: 'Copy',
    role: 'copy',
  }))

  document.body.addEventListener('contextmenu', (event: PointerEvent) => {
    event.preventDefault()
    event.stopPropagation()

    let node = event.target as HTMLElement

    while (node) {
      if (node.nodeName.match(/^(input|textarea)$/i) || node.isContentEditable) {
        editableContextMenu.popup(remote.getCurrentWindow())
        break
      }

      if (node.classList.contains('selectableText')) {
        selectableContextMenu.popup(remote.getCurrentWindow())
        break
      }

      node = node.parentNode as HTMLElement
    }
  })
}
