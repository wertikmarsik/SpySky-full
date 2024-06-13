import { it, expect } from "vitest";
import { shallowMount } from "@vue/test-utils";
import homePage from "./index.vue";

it("should mount the component", () => {
    const wrapper = shallowMount(homePage); 
    expect(wrapper.exists()).toBe(true);
})