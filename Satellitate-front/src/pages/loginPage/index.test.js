import { describe, it, expect, vi } from 'vitest';
import { mount, shallowMount } from '@vue/test-utils';
import axios from 'axios'

import login from './index.vue';
const url = "https://famous-plexus-417323.lm.r.appspot.com/";

describe('UI', () => {

    it('should show/hide the password', async () => {
        const wrapper = shallowMount(login);
        const input = wrapper.find("#password");
        const eyeBtn = wrapper.find(".visibilityButton");

        expect(wrapper.exists()).toBe(true);
        expect(input.exists()).toBe(true);
        expect(eyeBtn.exists()).toBe(true);

        await input.setValue('11111');
        expect(input.element.type).toBe('password');

        await eyeBtn.trigger("click");
        expect(input.element.type).toBe('text');

        await eyeBtn.trigger("click");
        expect(input.element.type).toBe('password');
    })
})

describe('User', () => {
    vi.mock('axios')
  
    it('should login user', async () => {
        const wrapper = shallowMount(login, {
            data() {
                return {
                    email: "email@gmail.com",
                    password: "1234"
                }
            }
        });

        const mockResponse = { data: "some cookies" };
        axios.post.mockResolvedValue(mockResponse);
        
        await wrapper.vm.loginUser();
        expect(axios.post).toHaveBeenCalledWith(`${url}/users/login`, 
        {
            email: wrapper.vm.email,
            password: wrapper.vm.password
        })
    });

    it('should return an error if not logged', async () => {
        const wrapper = shallowMount(login, {
            data() {
                return {
                    email: "wrong email",
                    password: "1234"
                }
            }
        });

        const mockResponse = new Error('You have passed wrong email or password!');
        axios.post.mockRejectedValue(mockResponse);
        
        await wrapper.vm.loginUser();
        expect(wrapper.vm.error).toBe('You have passed wrong email or password!');
    });

});