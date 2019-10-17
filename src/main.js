import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Form } from 'reactstrap';
import template_json from './templates';

import './css/main.css';

class SubmitForm extends React.Component
{
    constructor(props) {
        super(props);

        this.state = {
            template: template_json.find_different_records,
            result: [],
        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(e) {
        let template = this.state.template;
        template[e.target.name].value = e.target.value;
        this.setState({ template });
    }

    handleSubmit(e) {
        e.preventDefault();
        const reactStringReplace = require('react-string-replace');

        let sql = this.state.template.sql;
        let template = this.state.template;

        for (let key in template) {

            if (key === 'sql') continue;

            sql = reactStringReplace(sql, '$'+key, (match, i) => (
                <span key={key+i} style={{color: template[key].color}}>
                    `{template[key].value}`
                </span>
            ));
        }

        sql = reactStringReplace(sql, /(SELECT|FROM|GROUP|HAVING)/g, (match, i) => (
            <span key={i}><br /><span style={{color:'#3294cb'}}>{match}</span></span>
        ));

        this.setState({ result: sql });
    }

    render() {
        const columns_input= generateColumnInput(this.state.template, this.handleChange);
        return (
            <div className="container-contact100">
            <div className="wrap-contact100">
            <Form className="contact100-form" onSubmit={this.handleSubmit}>
                <span className="contact100-form-title">MySQL Generator</span>

                {columns_input}

                <div className="container-contact100-form-btn">
                    <button className="contact100-form-btn">
                        <span>
                          Generate
                          <i className="fa fa-long-arrow-right m-l-7" aria-hidden="true"></i>
                        </span>
                    </button>
                </div>
            </Form>

            <div className="wrap-input100 validate-input bg0 rs1-alert-validate" data-validate = "Please Type Your Message">
                    <span className="label-input100">Generated SQL</span>
                    <div className="input100">{this.state.result}</div>
            </div>
                
            </div>
            </div>
        );
    }

}

function generateColumnInput(template, handler)
{
    let inputs = [];

    for (let key in template) {

        if (key === 'sql') continue;

        inputs.push(
            <div className="wrap-input100 validate-input bg1" key={template[key].name}>
                <span className="label-input100">{template[key].name}</span>
                <input className="input100" type="text" name={key} placeholder={"Enter "+template[key].name} onChange={handler} />
            </div>
        );
    }

    return inputs;
}

export default SubmitForm;
