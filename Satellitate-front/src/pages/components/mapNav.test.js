import { describe, it, expect, vi } from "vitest";
import { shallowMount } from "@vue/test-utils";
import mapNavbar from "./mapNav.vue";

describe("Dropdown", () => {
    const wrapper = shallowMount(mapNavbar);
    const dropdown = wrapper.find("#user-dropdown");
    const userButton = wrapper.find("#user");

    it("should check if dropdown exists and hidden", () => {
        expect(dropdown.exists()).toBe(true);
        expect(wrapper.vm.isDropdownVisible).toBe(false);
    })

    it("should open/close dropdown when the button is clicked", async () => {

        await userButton.trigger("click");
        expect(wrapper.vm.isDropdownVisible).toBe(true);

        await userButton.trigger("click");
        expect(wrapper.vm.isDropdownVisible).toBe(false);
    })
})

describe("Burger menu dropdown", () => {
    const wrapper = shallowMount(mapNavbar);
    const burgerMenu = wrapper.find(".burger-menu-navlinks");
    const burgerIcon = wrapper.find("#burger-menu");

    it("should check if burger menu dropdown exists and hidden", () => {
        expect(burgerMenu.exists()).toBe(true);
        expect(burgerIcon.exists()).toBe(true);
        expect(wrapper.vm.areNavlinksVisible).toBe(false);
    })

    it("should open/close burger menu dropdown when the button is clicked", async () => {

        await burgerIcon.trigger("click");
        expect(wrapper.vm.areNavlinksVisible).toBe(true);

        await burgerIcon.trigger("click");
        expect(wrapper.vm.areNavlinksVisible).toBe(false);
    })
})

describe("Log out", () => {
    it("should delete cookies and redirect to main page when button is clicked", async () => {
        const wrapper = shallowMount(mapNavbar, {
            data() {
                return {
                    cookies: "some cookies..."
                }
            }
        })

        const button = wrapper.find("#logout");

        await button.trigger("click");
        expect(wrapper.vm.cookies).toBe("");
    })
})