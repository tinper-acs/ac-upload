import React, { Component } from 'react';
import { Button } from 'tinper-bee';
import AcUpload from './index';

import 'tinper-bee/assets/tinper-bee.css';
import './index.less';

class Demo extends Component {
    constructor() {
        super();
        this.state = {
            testList: []
        }
    }
    handlerUploadSuccess = (data) => {
        console.log('成功');
        console.log(data);
    }
    addTest = () => {
        this.setState({
            testList: [{
                fileName: 'b11a50c1f1-2f8e-4737-b341-e710010307e5_.png',
                accessAddress: 'http://10.10.24.43:8080/wbalone/images/ba50c1f1-2f8e-4737-b341-e710010307e5_.png',
            }, {
                fileName: 'b22a50c1f1-2f8e-4737-b341-e710010307e5_.png',
                accessAddress: 'http://10.10.24.43:8080/wbalone/images/ba50c1f1-2f8e-4737-b341-e710010307e5_.png',
            }]
        });
    }
    render() {
        return (
            <div>
                <Button onClick={this.addTest} colors="success">加</Button>
                <AcUpload
                    action="/upload.do"
                    defaultFileList={this.state.testList}
                    multiple={true}
                    isView={false}
                    onError={(err) => alert('上传报错了')}
                    onSuccess={this.handlerUploadSuccess}
                    onDelete={file=>console.log(file)}
                >
                    <Button shape="border" colors="success">上传</Button>
                </AcUpload>
            </div>
        );
    }
}

export default Demo;
