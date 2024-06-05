import { describe, it, expect } from 'vitest';
import { mount, shallowMount } from '@vue/test-utils';
import navbar from './navbar.vue';

describe('Dropdown', () => {
    const wrapper = mount(navbar);
    const dropdown = wrapper.find('#user-dropdown');
    const userButton = wrapper.find('.nav-buttons #user');

    it('should check if dropdown exists and hidden', () => {
        expect(dropdown.exists()).toBe(true);
        expect(wrapper.vm.isDropdownVisible).toBe(false);
    })

    it('should open/close dropdown when the button is clicked', async () => {



        expect(userButton.exists()).toBe(true);

        await userButton.trigger('click');
        expect(wrapper.vm.isDropdownVisible).toBe(true);

        await userButton.trigger('click');
        expect(wrapper.vm.isDropdownVisible).toBe(false);
    })
})

describe('Document click', () => {
    const wrapper = mount(navbar);
    const userButton = wrapper.find('#user');

    it('should close dropdown when clicked outside', async () => {

        const wrapper = shallowMount(navbar, {
            data() {
              return {
                logged: true,
              };
            },
          });

        await userButton.trigger('click');
        expect(userButton.exists()).toBe(true);
        expect(wrapper.vm.isDropdownVisible).toBe(true);


        document.dispatchEvent(new MouseEvent('click', { bubbles: true }))

        expect(document.body.click()).not.toBe(userButton);
        
        wrapper.vm.isDropdownVisible = false;
        expect(wrapper.vm.isDropdownVisible).toBe(false)
    })
})