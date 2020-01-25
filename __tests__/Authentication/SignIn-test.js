import React from 'react';
import { shallow } from 'enzyme';
import renderer from 'react-test-renderer';
import SignIn from '../../src/Component/Authentication/SignIn';

const wrapper = shallow(<SignIn/>)

/**************************** SignIn Component Testing ******************************/

it('SignIn Page renders correctly', () => {
    renderer.create(<SignIn />);
});

describe('<SignIn/>', () => {
    it('SignIn Page renders correctly', () => {
        expect(shallow(<SignIn />)).toMatchSnapshot();
    });

    it('checking initial state', () => {
        expect(wrapper.state('email')).toEqual('');
        expect(wrapper.state('password')).toEqual('');
    })

    const emailInput = wrapper.find('OutlinedTextField').first();
    const passInput = wrapper.find('OutlinedTextField').last();

    it('testing state of component after onChangeText event occur', () => {

        emailInput.props().onChangeText('andy@gmail.com');

        passInput.props().onChangeText('Abc@1234');

        expect(wrapper.state('email')).toEqual('andy@gmail.com');
        expect(wrapper.state('password')).toEqual('Abc@1234');
    })

    it('props of OutlinedTextField', () => {
        expect(emailInput.findWhere((node) => node.prop('label') === 'Email')).toExist();
        expect(emailInput.findWhere((node) => node.prop('errorColor') === 'red')).toExist();
    });

    it('testing validateForm mathod for email validation', () => {

        const instance = wrapper.instance()
        expect(instance.validateForm()).toBe(true)

        emailInput.props().onChangeText('andygmail.com');
        expect(instance.validateForm()).toBe(false)

        emailInput.props().onChangeText('andy@gmail.com');
        expect(instance.validateForm()).toBe(true)

    })

    it('testing validateForm mathod for password validation', () => {

        const instance = wrapper.instance()

        passInput.props().onChangeText('');
        expect(instance.validateForm()).toBe(false)

        passInput.props().onChangeText('Abc@1234');
        expect(instance.validateForm()).toBe(true)
    })

    it('testing visible password toggling', () => {
        const showPasswordBtn = wrapper.findWhere((node)=>node.prop('testId') === 'testPassVisibility')
        expect(wrapper.state('visibleIcon')).toEqual(false)

        showPasswordBtn.simulate('press');
        expect(wrapper.state('visibleIcon')).toEqual(true)
        showPasswordBtn.simulate('press');
        expect(wrapper.state('visibleIcon')).toEqual(false)
    })

    it('testing Button', () => {
        expect(wrapper.findWhere((node) => node.prop('title') === 'Create Account').length).toBe(1)
        const nextButton = wrapper.findWhere((node) => node.prop('title') === 'Next')
        wrapper.setState({
            email: 'andgmail.com',
            password: 'bc@1234'
        })

        expect(wrapper.state('email')).toEqual('andgmail.com');
        expect(wrapper.state('password')).toEqual('bc@1234');

        nextButton.simulate('press')
        expect(wrapper.state('errors')).toEqual({
            'email': '*Enter valid email-ID.'
        })
    })
});