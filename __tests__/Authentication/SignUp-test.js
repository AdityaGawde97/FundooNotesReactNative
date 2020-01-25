import React from 'react';
import { shallow } from 'enzyme';

import renderer from 'react-test-renderer';
import SignUpPage1 from '../../src/Component/Authentication/SignUpPage1';
import SignUpPage2 from '../../src/Component/Authentication/SignUpPage2';
import SignUpPage3 from "../../src/Component/Authentication/SignUpPage3"

const findElement = (tree, element) => {
    let result = undefined;
    for(node in tree.children){
        if(tree.children[node].props.testId=element){
            result = true;
        }
    }
    return result;
}

/**************************** SignUpPage1 Component Testing ******************************/

const wrapper1 = shallow(<SignUpPage1/>)

// This test just uses Jest snapshot testing
it('SignUpPage1 Page renders correctly', () => {
    renderer.create(<SignUpPage1 />);
});

// Using Jest + Enzyme
describe('<SignUpPage1/>', () => {
    it('SignUpPage1 Matching SnapShot', () => {
        expect(shallow(<SignUpPage1 />)).toMatchSnapshot();
    });

    it('checking initial state', () => {
        expect(wrapper1.state('firstName')).toEqual('');
        expect(wrapper1.state('lastName')).toEqual('');
    })
    const firstName = wrapper1.find('OutlinedTextField').first();
    const lastName = wrapper1.find('OutlinedTextField').last();

    it('testing state of component after onChangeText event occur', () => {

        firstName.props().onChangeText('Aditya');

        lastName.props().onChangeText('Gawde');

        expect(wrapper1.state('firstName')).toEqual('Aditya');
        expect(wrapper1.state('lastName')).toEqual('Gawde');
    })

    it('props of OutlinedTextField', () => {
        expect(firstName.findWhere((node) => node.prop('label') === 'First name')).toExist();
        expect(lastName.findWhere((node) => node.prop('label') === 'Last name')).toExist();
    });

    it('testing validateForm mathod for first name and last name validation', () => {

        const instance = wrapper1.instance()
        expect(instance.validateForm()).toBe(true)

        firstName.props().onChangeText('');
        expect(instance.validateForm()).toBe(false)

        lastName.props().onChangeText('');
        expect(instance.validateForm()).toBe(false)

    })
});

/**************************** SignUpPage2 Component Testing ******************************/

const wrapper2 = shallow(<SignUpPage2/>)

it('SignUpPage2 Page renders correctly', () => {
    renderer.create(<SignUpPage2 />);
});

describe('<SignUpPage2/>', () => {
    it('SignUpPage2 Matching SnapShot', () => {
        expect(shallow(<SignUpPage2 />)).toMatchSnapshot();
    });

    it('checking initial state', () => {
        expect(wrapper2.state('email')).toEqual('');
    })
    const emailInput = wrapper2.find('OutlinedTextField').first();

    it('testing state of component after onChangeText event occur', () => {

        emailInput.props().onChangeText('andy@gmail.com');

        expect(wrapper2.state('email')).toEqual('andy@gmail.com');
    })

    it('props of OutlinedTextField', () => {
        expect(emailInput.findWhere((node) => node.prop('label') === 'Email')).toExist();
        expect(emailInput.findWhere((node) => node.prop('errorColor') === 'red')).toExist();
    });

    it('testing validateForm mathod for email validation', () => {

        const instance = wrapper2.instance()
        expect(instance.validateForm()).toBe(true)

        emailInput.props().onChangeText('andygmail.com');
        expect(instance.validateForm()).toBe(false)

        emailInput.props().onChangeText('andy@gmail.com');
        expect(instance.validateForm()).toBe(true)

    })
});

/**************************** SignUpPage3 Component Testing ******************************/

const wrapper3 = shallow(<SignUpPage3/>)
const tree3 = renderer.create(<SignUpPage3 />).toJSON()

it('SignUpPage3 Page renders correctly', () => {
    renderer.create(<SignUpPage3 />);
});

describe('<SignUpPage3/>', () => {
    it('SignUpPage3 Matching SnapShot', () => {
        expect(shallow(<SignUpPage3 />)).toMatchSnapshot();
    });

    it('checking initial state', () => {
        expect(wrapper3.state('password')).toEqual('');
        expect(wrapper3.state('confirm')).toEqual('');
    })

    const password = wrapper3.find('OutlinedTextField').first();
    const confirm = wrapper3.find('OutlinedTextField').last();

    it('testing state of component after onChangeText event occur', () => {

        password.props().onChangeText('Abc@1234');

        confirm.props().onChangeText('Abc@1234');

        expect(wrapper3.state('password')).toEqual('Abc@1234');
        expect(wrapper3.state('confirm')).toEqual('Abc@1234');
    })

    it('props of OutlinedTextField', () => {
        expect(password.findWhere((node) => node.prop('label') === 'Password')).toExist();
        expect(password.findWhere((node) => node.prop('errorColor') === 'red')).toExist();
        expect(confirm.findWhere((node) => node.prop('label') === 'Confirm')).toExist();
        expect(confirm.findWhere((node) => node.prop('errorColor') === 'red')).toExist();
    });

    it('testing validateForm mathod for email validation', () => {

        const instance = wrapper3.instance()
        expect(instance.validateForm()).toBe(true)

        password.props().onChangeText('Abc1234');
        expect(instance.validateForm()).toBe(false)
        password.props().onChangeText('abc@dgdfhd');
        expect(instance.validateForm()).toBe(false)
        password.props().onChangeText('abc1234');
        expect(instance.validateForm()).toBe(false)

        password.props().onChangeText('Abc@1234');
        expect(instance.validateForm()).toBe(true)

        confirm.props().onChangeText('Xyz@1234');
        expect(instance.validateForm()).toBe(false)

        confirm.props().onChangeText('Abc@1234');
        expect(instance.validateForm()).toBe(true)

    })

    it('testing visible password toggling', () => {
        const showPasswordBtn = wrapper.findWhere((node)=>node.prop('testId') === 'testPassVisibility2')
        expect(wrapper3.state('visibleIcon')).toEqual(false)
        showPasswordBtn.simulate('press');
        expect(wrapper3.state('visibleIcon')).toEqual(true)
        showPasswordBtn.simulate('press');
        expect(wrapper3.state('visibleIcon')).toEqual(false)
        expect(findElement(tree3, 'testPassVisibility2')).toBeDefined();
    })
});
