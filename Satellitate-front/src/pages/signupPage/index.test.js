import { describe, it, expect, vi } from 'vitest';
import { mount, shallowMount } from '@vue/test-utils';
import { ref } from "vue";
import axios from 'axios'

import sign from './index.vue';
const url = "https://famous-plexus-417323.lm.r.appspot.com/";

describe('Sign up', () => {
    it('should change page to second when clicked on a button', async () => {
        const wrapper = shallowMount(sign, {
            data() {
                return {
                    currentPage: ref("page1") 
                }
            }
        });
        const nextBtn = wrapper.find("#next-button");
        
        expect(nextBtn.exists()).toBe(true);
        expect(wrapper.vm.currentPage.value).toBe("page1");
        await nextBtn.trigger("click");
        expect(wrapper.vm.currentPage.value).toBe("page2");
    })
})