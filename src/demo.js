import React, { Component } from 'react';
import { Button } from 'tinper-bee';
import AcUpload from './index';

import 'tinper-bee/assets/tinper-bee.css';
import './index.less';

class Demo extends Component {
    constructor() {
        super();
        this.state = {

        }
    }
    handlerUploadSuccess = (data) => {
        console.log('成功');
        console.log(data);
    }
    render() {
        return (
            <div>
                <AcUpload
                    defaultFileList={[{
                        fileName: 'ba50c1f1-2f8e-4737-b341-e710010307e5_.png',
                        accessAddress: 'http://10.10.24.43:8080/wbalone/images/ba50c1f1-2f8e-4737-b341-e710010307e5_.png',
                    }]}
                    multiple={false}
                    isView={false}
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
