import { it, expect } from "vitest";
import { shallowMount } from "@vue/test-utils";
import missionPage from "./index.vue";

it("should mount the component", () => {
    const wrapper = shallowMount(missionPage); 
    expect(wrapper.exists()).toBe(true);
})