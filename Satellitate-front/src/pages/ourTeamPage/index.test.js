import { it, expect } from "vitest";
import { shallowMount } from "@vue/test-utils";
import teamPage from "./index.vue";

it("should mount the component", () => {
    const wrapper = shallowMount(teamPage); 
    expect(wrapper.exists()).toBe(true);
})