import { it, expect } from "vitest";
import { shallowMount } from "@vue/test-utils";
import contactPage from "./index.vue";

it("should mount the component", () => {
    const wrapper = shallowMount(contactPage); 
    expect(wrapper.exists()).toBe(true);
})