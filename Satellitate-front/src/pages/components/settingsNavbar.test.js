import { describe, it, expect } from 'vitest';
import { mount, shallowMount } from '@vue/test-utils';
import settingsNavbar from './settingsNavbar.vue';

describe('User', () => {
  
    it('should delete cookies and redirect to the home page', () => {
      const wrapper = shallowMount(settingsNavbar, {
        props: {
            data: {
              first_name: "name",
              last_name: "last",
              email: "some email",
            },
          },
        data() {
            return {
                cookies: "some cookies"
            };
        }
      });

      wrapper.vm.deleteCookie();
      expect(wrapper.vm.cookies).toEqual("");

    })
  })