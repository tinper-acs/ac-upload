import React, { Component } from 'react';
import { Button } from 'tinper-bee';
import AcUpload from './index';

import 'tinper-bee/assets/tinper-bee.css';
import './index.less';

class Demo extends Component {
    constructor(){
        super();
        this.state = {
            
        }
    }
    handlerUploadSuccess = (data) => {
        console.log(data);
    }
    render() {
        return (
            <div>
                <AcUpload
                    multiple={true}
                    onError={(err) => alert('上传报错了')}
                    onSuccess={this.handlerUploadSuccess}
                >
                    <Button shape="border" colors="success">上传</Button>
                </AcUpload>
            </div>
        );
    }
}

export default Demo;
