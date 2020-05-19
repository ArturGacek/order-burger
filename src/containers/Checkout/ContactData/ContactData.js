import React, {Component} from 'react';
import Button from "../../../components/UI/Button/Button";
import classes from './ContactData.module.css'
import axios from '../../../axios-orders'
import Spinner from "../../../components/UI/Spinner/spinner";
import Input from "../../../components/UI/Input/Input";
import {connect} from 'react-redux'
import WithErrorHandler from "../../../hoc/WithErrorHandler/WithErrorHandler";
import * as actions from '../../../store/actions/index';
import {updateObject} from "../../../shared/utility";
import {checkValidity} from "../../../shared/validity";

class ContactData extends Component {
    state = {
        // name: '',
        // email: '',
        // address: {
        //     street: '',
        //     postalCode: ''
        orderForm: {
            name: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your Name',
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            street: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Street',
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            zipCode: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'ZIP Code',
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 5,
                    maxLength: 5,
                    isNumeric: true
                },
                valid: false,
                touched: false
            },
            country: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Country',
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Your E-mail',
                },
                value: '',
                validation: {
                    required: true,
                    isEmail: true
                },
                valid: false,
                touched: false
            },
            deliveryMethod: {
                elementType: 'select',
                elementConfig: {
                    options: [
                        {value: 'fastest', displayValue: 'Fastest'},
                        {value: 'cheapest', displayValue: 'Cheapest'}
                    ]
                },
                value: 'fastest',
                validation: {},
                valid: true
            }
        },
        formIsValid: false,
        // loading: false
    };

    orderHandler = (event) => {
        event.preventDefault();
        // this.setState({loading: true});

        const formData = {};
        for (let formElementIdentifier in this.state.orderForm) {
            formData[formElementIdentifier] = this.state.orderForm[formElementIdentifier].value
        }

        const order = {
            ingredients: this.props.ings,
            price: this.props.price,
            orderData: formData,
            userId: this.props.userId
        //     customer: {
        //         name: 'Max',
        //         address: {
        //             street: 'Test',
        //             zipCode: '43534',
        //             country: 'Poland'
        //         },
        //         email: 'test@test.com'
        //     },
        //     deliveryMethod: 'fastest'
        };
        // axios.post('/orders.json', order)
        //     .then(response => {
        //         this.setState({loading: false});
        //         this.props.history.push('/');
        //     })
        //     .catch(error => {
        //         this.setState({loading: false})
        //     });
        this.props.onOrderBurger(order, this.props.token);
    };

    // checkValidity(value, rules) {
    //     let isValid = true;
    //
    //     // if (!rules) {
    //     //    return true;
    //     // }
    //
    //     if (rules.required) {
    //         isValid = value.trim() !== '' && isValid;
    //     }
    //
    //     if (rules.minLength) {
    //         isValid = value.length >= rules.minLength && isValid;
    //     }
    //
    //     if (rules.maxLength) {
    //         isValid = value.length <= rules.maxLength && isValid;
    //     }
    //     if (rules.isEmail) {
    //         const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
    //         isValid = pattern.test(value) && isValid
    //     }
    //
    //     if (rules.isNumeric) {
    //         const pattern = /^\d+$/;
    //         isValid = pattern.test(value) && isValid
    //     }
    //     return isValid;
    // }

    inputChangedHandler = (event, inputIdentifier) => {
        // console.log(event.target.value);
        // const updatedOrderForm = {
        //     ...this.state.orderForm
        // };
        // const updatedFormElement = {
        //     ...updatedOrderForm[inputIdentifier]
        // };
        const updatedFormElement = updateObject(this.state.orderForm[inputIdentifier], {
            value: event.target.value,
            // valid: this.checkValidity(event.target.value, this.state.orderForm[inputIdentifier].validation),
            valid: checkValidity(event.target.value, this.state.orderForm[inputIdentifier].validation),
            touched: true
            });
    //     {
    //         ...updatedOrderForm[inputIdentifier]
    //     };
    //     updatedFormElement.value = event.target.value;
    //     updatedFormElement.valid = (
    //         this.checkValidity(updatedFormElement.value, updatedFormElement.validation)
    // );
    //     updatedFormElement.touched = true;
        const updatedOrderForm = updateObject (this.state.orderForm,
            {[inputIdentifier]: updatedFormElement});
        // updatedOrderForm[inputIdentifier] = updatedFormElement;
        // console.log(updatedFormElement);

        let formIsValid = true;

        for (let inputIdentifier in updatedOrderForm) {
            formIsValid = updatedOrderForm[inputIdentifier].valid && formIsValid;
        }
        // console.log(formIsValid);
        this.setState({orderForm: updatedOrderForm, formIsValid: formIsValid});
    };

    render() {
        const formElementArray = [];

        for (let key in this.state.orderForm) {
            formElementArray.push({
                id: key,
                config: this.state.orderForm[key]
            })
        }

        let form = ( <form onSubmit={this.orderHandler}>
            {/*<Input inputtype="input" type="text" name="name" placeholder="Your name"/>*/}
            {/*<Input inputtype="input" type="email" name="email" placeholder="Your email"/>*/}
            {/*<Input inputtype="input" type="text" name="street" placeholder="Street"/>*/}
            {/*<Input inputtype="input" type="text" name="postal" placeholder="Postal Code"/>*/}
            {formElementArray.map(formElement => (
                <Input
                    key={formElement.id}
                    elementType={formElement.config.elementType}
                    elementConfig={formElement.config.elementConfig}
                    value={formElement.config.value}
                    invalid={!formElement.config.valid}
                    shouldValidate={formElement.config.validation}
                    touched={formElement.config.touched}
                    changed={(event) => this.inputChangedHandler(event, formElement.id)}
                />
            ))}
            <Button btnType="Success"
                    disabled={!this.state.formIsValid}
                    // clicked={this.orderHandler}
            >ORDER</Button>
        </form>);

        // if (this.state.loading) {
        if (this.props.loading) {
            form = <Spinner/>
        }

        return (
            <div className={classes.ContactData}>
                <h4>Enter Your Contact Data</h4>
                {form}
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        ings: state.burgerBuilder.ingredients,
        price: state.burgerBuilder.totalPrice,
        loading: state.order.loading,
        token: state.auth.token,
        userId: state.auth.userId
    }
};

const mapDispatchToProps = dispatch => {
    return{
        onOrderBurger: (orderData, token) => dispatch(actions.purchaseBurger(orderData, token))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(WithErrorHandler(ContactData, axios));