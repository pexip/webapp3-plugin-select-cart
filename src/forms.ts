import { RPCCallPayload, SelectElement } from '@pexip/plugin-api'
import { readDepartmentsConfiguration, readSipConfiguration } from './utils'
import type { Plugin } from '@pexip/plugin-api'
import { Department } from './types'

let departments: Department[] = []

export const ToolbarButton: RPCCallPayload<'ui:button:add'> = {
  position: 'toolbar',
  icon: 'IconVideoSystems',
  tooltip: 'Add Cart',
  roles: ['chair']
}

export const NoDepartmentPrompt: RPCCallPayload<'ui:prompt:open'> = {
  title: 'Add Cart',
  description: 'No department configured',
  prompt: {
    primaryAction: 'Close'
  }
}

export const NoCartPrompt: RPCCallPayload<'ui:prompt:open'> = {
  title: 'Add Cart',
  description: 'No cart configured for selected department',
  prompt: {
    primaryAction: 'Close'
  }
}

// Build the department selection form
export const buildDepartmentSelection = async (departments: Department[]) => {
  let buttonText = 'Select'

  const departmentSelection: SelectElement = {
    name: 'Select a Department',
    type: 'select',
    options: departments
  } as SelectElement

  const departmentForm = {
    title: 'Add Cart',
    description: '',
    form: {
      elements: { departmentId: departmentSelection },
      submitBtnTitle: buttonText
    }
  } as const

  return departmentForm
}

// Build the cart selection form
export const buildCartSelection = async (department: Department) => {
  let buttonText = 'Add'

  const carts = department.carts || []

  const cartsSelection: SelectElement = {
    name: `Select a cart from ${department.label}`,
    type: 'select',
    options: carts
  } as SelectElement

  const cartsForm = {
    title: 'Add Cart',
    description: '',
    form: {
      elements: { cartId: cartsSelection },
      submitBtnTitle: buttonText
    }
  } as const

  return cartsForm
}

// Initiate the selection workflow
export const showDepartmentSelection = async (plugin: Plugin) => {
  departments = await readDepartmentsConfiguration()

  // If no departments are configured, show a prompt
  if (departments.length < 1) {
    await plugin.ui.showPrompt(NoDepartmentPrompt)
    return
  }

  const departmentSelection = await plugin.ui.showForm(
    await buildDepartmentSelection(departments)
  )
  // Get the selected department object from the department list
  const selectedDepartment = departments.find(
    (department) => department.id === departmentSelection.departmentId
  )

  if (selectedDepartment) {
    if (
      selectedDepartment.carts === undefined ||
      selectedDepartment.carts.length < 1
    ) {
      await plugin.ui.showPrompt(NoCartPrompt)
      return
    }
    const cartSelection = await plugin.ui.showForm(
      await buildCartSelection(selectedDepartment)
    )

    if (cartSelection.cartId && selectedDepartment.carts) {
      // Get the selected cart object from the cart list
      const selectedCart = selectedDepartment.carts.find(
        (cart) => cart.id === cartSelection.cartId
      )

      if (selectedCart && selectedCart.id !== '0') {
        const sipConfiguration = await readSipConfiguration()
        await plugin.conference.dialOut({
          protocol: 'auto',
          destination: `sip:${selectedCart.id}@${sipConfiguration.host}`,
          role: sipConfiguration.role
        })
      }
    }
  }
}
