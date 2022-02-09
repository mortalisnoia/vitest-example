import { mount } from '@vue/test-utils';
import app from '../App.vue'
import { afterEach, describe, expect, it, vi} from 'vitest';

const rollButton = '#roll';
const numberOfRolls = '#numberOfRolls';
const restartButton = '#restart';
const currentNumber = '#currentNumber';
const total = '#total';

function factory() {
    return mount(app);
}

describe('Testes de estado inicial e interação do componente', () => {

    afterEach(() => {
        vi.clearAllMocks();
    })

    it('Checando estado inicial da montagem', async () => {
        expect(app).toBeTruthy()

        const wrapper = mount(app);
        expect(wrapper.find(currentNumber).text()).toBe('Number is: 0');
        expect(wrapper.find(total).text()).toBe('Total: 0');
        expect(wrapper.find(numberOfRolls).text()).toBe('Number of rolls: 0');
        expect(wrapper.find(rollButton).text()).toBe("Let's roll the dice");
        expect(wrapper.find(restartButton).text()).toBe('Restart');
    })

    it('Should list the number when rolling the dice', async () => {
        const wrapper = factory();
        await wrapper.find(rollButton).trigger('click');
        const list = wrapper.findAll('li');
        expect(list.at(0)).toBeTruthy();
        expect(wrapper.find(numberOfRolls).text()).toBe('Number of rolls: 1');
        expect(wrapper.find(currentNumber).text()).toContain(list.at(0).text())
    })

    it('Should keep all past and current roll number on the list', async() => {
        const wrapper = factory();
        await wrapper.find(rollButton).trigger('click');
        const firstRoll = wrapper.find('li').text();
        await wrapper.find(rollButton).trigger('click');
        const list = wrapper.findAll('li');
        expect(list.at(0)).toBeTruthy();
        expect(list.at(1)).toBeTruthy();
        expect(list.at(1).text()).toBe(firstRoll);
    })

    it('If I roll 15 times, Number of rolls should show 15', async () => {
        const wrapper = factory();
        for (let i = 0; i < 15; i++) {
            await wrapper.find(rollButton).trigger('click');
        }
        expect(wrapper.find(numberOfRolls).text()).toBe('Number of rolls: 15');
    })

    it('When clicking on Restart, everything must change to initial state', async () => {
        const wrapper = factory();
        for (let i = 0; i < 15; i++) {
            await wrapper.find(rollButton).trigger('click');
        }
        await wrapper.find(restartButton).trigger('click');
        expect(wrapper.find(currentNumber).text()).toBe('Number is: 0');
        expect(wrapper.find(total).text()).toBe('Total: 0');
        expect(wrapper.find(numberOfRolls).text()).toBe('Number of rolls: 0');
        const list = wrapper.findAll('li');
        expect(list.length).toBe(0);
    })

    it('Total should be equal to the sum of all numbers on the list', async () => {
        const wrapper = factory();
        for (let i = 0; i < 15; i++) {
            await wrapper.find(rollButton).trigger('click');
        }
        const list = wrapper.findAll('li');
        let sumOfNumbers = 0;
        for (let i = 0; i < list.length; i++) {
            sumOfNumbers += parseInt(list.at(i).text());
        }
        expect('Total: ' + sumOfNumbers).toEqual(wrapper.find(total).text());
    })
})