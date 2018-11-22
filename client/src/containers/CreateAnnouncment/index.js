import React, { Component } from 'react';
import { connect } from 'react-redux';

import classes from './index.css';
import Button from '../../components/UI/Button';
import ButtonLoader from '../../components/UI/ButtonLoader';
import RenderInputs from './helpers/RenderInputs';

class CreateAnnouncment extends Component {

    constructor(props) {
        super(props);
        this.form = React.createRef();
        this.state = {
            images: [],
            inputs: {  
                title: {
                    type: 'text',
                    value: '',
                    placeHolder: 'Title',
                    example: 'Best products ...',
                    display: false
                },
                cost: {
                    type: 'number',
                    value: '',
                    placeHolder: 'Price ',
                    example: 'You can leave this input blank for the price to be negotiated',
                    display: false
                },
                phone: {
                    type: 'number',
                    value: '',
                    placeHolder: 'Phone',
                    example: '+1908238232',
                    display: false
                },
                description: {
                    type: 'textarea',
                    value: '',
                    placeHolder: 'Description',
                    example: 'Best product in the world...',
                    display: false
                },
                includeEmail: {
                    type: 'checkbox',
                    value: false,
                    placeHolder: 'Include email'
                }
            },
            error: null,
            loading: false
        }
    }
    

    fileInputHandler = (e) => {
        const images = [];
        const files = e.target.files;
        const self = this;

        function readAndPreview(file) {

            var reader = new FileReader();
        
            reader.addEventListener("load", function () {
                images.push(reader.result);
                if(images.length === files.length) {
                    self.setState({images});
                }
            }, false);
        
            reader.readAsDataURL(file);
        }
        
        if (files) {
            [].forEach.call(files, readAndPreview);
        }
    }

    inputHandler = (e, key) => {
        const inputs = {...this.state.inputs};
        
        if(key === 'includeEmail') {
            inputs[key].value = !inputs[key].value;
        } else {
            inputs[key].value = e.target.value;
        }

        this.setState({inputs});
    }

    validate = () => {
        if(this.state.images.length !== 0) {
            if(this.state.inputs.title.value.length > 6) {
                if(this.state.inputs.cost.length !== 0) {
                    if(this.state.inputs.phone.value.length > 5) return true;
                    else {
                        this.setState({error: 'Phone number is too short', loading: false});
                        return false;
                    }
                } else {
                    this.setState({error: 'You did not input price of the offer', loading: false});
                    return false;
                }
            } else {
                this.setState({error: 'Title must be more 6 characters', loading: false});
                return false;
            }
        } else {
            this.setState({error: 'You did not choose any image', loading: false});
            return false;
        }
    }

    submitHandler = async() => {
        if(this.validate()) {
            this.setState({loading: true});
            const inputs = {...this.state.inputs};
            const formData = new FormData(this.form.current);
    
            Object.keys(inputs).map(key => formData.append(key, inputs[key].value));
            
            try {
                const response = await fetch('/api/offers/create', {
                    method: 'POST',
                    body: formData
                });
                const data = await response.json();
    
                if(data.created) {
                    this.setState({loading: false}, () => {
                        this.props.history.push('/profile');
                    });
                } else {
                    this.setState({error: data.massage, loading: false});
                }
            } catch (error) {
                console.log(error);
                this.setState({error: 'Error, Try again later', loading: false});
            }
        }
    }

    clearDisplays = () => {
        const inputs = {...this.state.inputs}
        Object.keys(inputs).forEach(key => inputs[key].display = false);
        return inputs;
    }

    displayExampleHandler = (key) => {
        let inputs = {...this.state.inputs};

        inputs = this.clearDisplays();

        inputs[key].display = true;

        this.setState({inputs});
    }

    render () {
        let images = null;
        
        if(this.state.images.length > 0) {
            images = this.state.images.map((src, index) => {
                return <img src={src} alt={index} key={index}/>
            });
        }

        return (
            <div className={classes.Container}>
                <form ref={this.form} encType="multipart/form-data">
                    <input
                        onChange={this.fileInputHandler} 
                        type="file"
                        multiple={true} 
                        id="images"
                        name="images" 
                        accept="image/jpeg, images/jpg, images/png" 
                    />
                </form>
                <div className={classes.Form}>
                    <h2>Create Offer</h2>
                    {
                        this.state.images.length > 0 ?
                        <div className={classes.Images}>
                            {images}
                        </div> :
                        null
                    }
                    <label htmlFor="images">
                        <Button
                            value="Choose images"
                            color="var(--comain-color)"
                            textColor="#fff"
                            givenClassName={classes.ImagesButton}
                        />
                    </label>
                    <RenderInputs 
                        inputs={this.state.inputs}
                        inputHandler={this.inputHandler}
                        displayExample={this.displayExampleHandler}
                    />
                    {
                        this.state.error ?
                        <div className={classes.Error}>{this.state.error}</div> :
                        null
                    }
                    <Button 
                        value="Submit"
                        givenClassName={classes.SubmitButton}
                        clicked={this.submitHandler}
                    > 
                        {this.state.loading ? <ButtonLoader /> : null}
                    </Button>
                </div>
            </div>
        );
    }   
}

export default connect(state => ({
    isAuth: state.authState.auth
}))(CreateAnnouncment);