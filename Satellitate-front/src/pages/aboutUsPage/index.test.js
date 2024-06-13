import { it, expect } from 'vitest';
import { shallowMount } from '@vue/test-utils';
import aboutUsPage from './index.vue';

it('should mount the component', () => {
    const wrapper = shallowMount(aboutUsPage); 
    expect(wrapper.exists()).toBe(true);
})