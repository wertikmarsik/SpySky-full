import { it, expect } from "vitest";
import { shallowMount } from "@vue/test-utils";
import toolsPage from "./index.vue";

it("should mount the component", () => {
    const wrapper = shallowMount(toolsPage); 
    expect(wrapper.exists()).toBe(true);
})