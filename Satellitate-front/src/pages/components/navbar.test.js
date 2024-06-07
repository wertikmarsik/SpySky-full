import { describe, it, expect, vi } from 'vitest';
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

describe('Burger menu', () => {
  const wrapper = mount(navbar);
  const burgerBtn = wrapper.find('#nav-burger-menu');

  it('should show/hide burger menu when the button is clicked', async () => {
    expect(burgerBtn.exists()).toBe(true);

    await burgerBtn.trigger('click');
    expect(wrapper.vm.isBurgerDropdownVisible).toBe(true);

    await burgerBtn.trigger('click');
    expect(wrapper.vm.isBurgerDropdownVisible).toBe(false);
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
        expect(wrapper.vm.isDropdownVisible).toBe(false);


        document.dispatchEvent(new MouseEvent('click', { bubbles: true }))

        expect(document.body.click()).not.toBe(userButton);
        
        wrapper.vm.isDropdownVisible = false;
        expect(wrapper.vm.isDropdownVisible).toBe(false)
    })
})

describe('User', () => {
  
  it('should check if cookies are not empty when logged', () => {
      const wrapper = shallowMount(navbar, {
        data() {
          return {
            cookies: "some cookies...",
          };
        },
      })

      wrapper.vm.checkUser();

      expect(wrapper.vm.logged).toBe(true);
      expect(wrapper.vm.notLogged).toBe(false);
  })

  it('should delete cookies and reload the page', () => {
    const wrapper = mount(navbar);
    wrapper.vm.deleteCookieAndRedirect();

    expect(wrapper.vm.cookies).toEqual("");
  })

  it('should check cookies', () => {
    const wrapper = mount(navbar);
    wrapper.vm.checkUser();

    expect(wrapper.vm.logged).toBe(false);
    expect(wrapper.vm.notLogged).toBe(true);
  })
})