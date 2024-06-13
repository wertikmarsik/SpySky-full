import { it, expect } from "vitest";
import { shallowMount } from "@vue/test-utils";
import footer from "./footer.vue";

it("should mount the component", () => {
    const wrapper = shallowMount(footer); 
    expect(wrapper.exists()).toBe(true);
})