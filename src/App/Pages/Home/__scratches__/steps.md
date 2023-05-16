Page

```javascript
import React, {useState} from 'react';
import './styles.scss';
import {Helmet} from 'react-helmet';
import OfxService from 'services/ofx';
import FirstPage from './FirstPage';
import SecondPage from './SecondPage';

const Ofx = () => {
    const [hasFile, setHasFile] = useState(false);
    const [selectedFile, setFile] = useState({
        bank: {
            code: '',
            name: '',
        },
        statement: {
            startDate: '',
            endDate: '',
            balanceDate: '',
            total: {
                credit: '',
                debit: '',
                balance: '',
            },
            transactions: [],
            monthlyTransactions: {},
        },
    });

    const handleUpload = async data => {
        const {file} = await OfxService.uploadFile(data);
        await setFile(file);
        await setHasFile(true);
    };
    return (
        <>
            <article className="contractPage">
                <Helmet>
                    <title>Ofx</title>
                    <meta name="description" content="Ofx"/>
                </Helmet>
                <div className="contractPage--header" style={{padding: '0 1em'}}>
                    <h1>Aferição de renda</h1>
                    <br/>
                </div>
                <hr/>
                <div className="react-tabs__tab-panel react-tabs__tab-panel--selected">
                    <div className="ofx">
                        <div className="container">
                            {!hasFile ? (
                                <FirstPage handleUpload={handleUpload}/>
                            ) : (
                                <>
                                    <SecondPage selectedFile={selectedFile}/>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </article>
        </>
    );
};

export default Ofx;
```
container
```javascript
import React from 'react';
import PropTypes from 'prop-types';
import './styles.scss';

const InfoBtn = ({ info, setInfo }) => (
  <>
    <div id="info-btn" className="flex col">
      <div className="flex row" style={{ justifyContent: 'flex-end' }}>
        <button type="button" onClick={() => setInfo(!info)}>
          <i className="fa fa-info-circle" aria-hidden="true" />
        </button>
      </div>
    </div>
  </>
);
const InfoHelp = ({ info, setInfo }) => (
  <section id="info-help">
    {info && (
      <div className="info">
        <div className="info-modal">
          <button type="button" onClick={() => setInfo(!info)}>
            <i className="fa fa-long-arrow-right arrow1" aria-hidden="true" />
          </button>
        </div>
      </div>
    )}
  </section>
);

class FirstPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = { info: null, file: null };
    this.handleUploadImage = this.handleUploadImage.bind(this);
    this.setInfo = this.setInfo.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  setInfo(info) {
    this.setState({ info });
  }

  async handleUploadImage(ev) {
    ev.preventDefault();
    const { handleUpload } = this.props;
    const file = this.uploadInput.files[0];
    const onFileLoad = el => () => handleUpload({ fileData: el.result, fileName: file.name });
    const reader = new FileReader();
    reader.onloadend = onFileLoad(reader);
    reader.readAsDataURL(file);
  }

  handleChange(ev) {
    ev.preventDefault();
    const file = ev.currentTarget.value;
    this.setState({ file });
  }

  render() {
    const { info, file } = this.state;
    const { setInfo } = this;
    const infoProps = { info, setInfo };
    return (
      <>
        <section className="ofx2">
          <div className="uploader">
            <div className="card">
              <InfoBtn {...infoProps} />
              <>
                <form id="file-upload-form" className="" onSubmit={this.handleUploadImage}>
                  <input
                    ref={ref => {
                      this.uploadInput = ref;
                    }}
                    type="file"
                    className="file-input"
                    accept=".ofx"
                    onChange={ev => this.handleChange(ev)}
                    id="file-upload"
                  />

                  <label htmlFor="file-upload" id="file-drag">
                    <div>
                      <div>
                        <p className="lead">
                          Escolha um Arquivo <b>OFX</b>
                        </p>
                      </div>
                      <div id="start">
                        <i className={`fa fa-download`} aria-hidden="true" style={file && !!file ? { color: 'rebeccapurple' } : {}} />
                        <InfoHelp {...infoProps} />

                        <div>
                          <p>Select a file </p>
                        </div>
                      </div>
                    </div>
                    <input type="hidden" style={{ display: 'none' }} />
                  </label>
                  <div>
                    {file && !!file && (
                      <button type="submit">
                        <span id="file-upload-btn" className="btn btn-primary">
                          Submit
                        </span>
                      </button>
                    )}
                  </div>
                </form>
              </>
            </div>
          </div>
        </section>
      </>
    );
  }
}

export default FirstPage;

FirstPage.propTypes = {
  handleUpload: PropTypes.func,
};
InfoBtn.propTypes = {
  info: PropTypes.bool,
  setInfo: PropTypes.func,
};
InfoHelp.propTypes = {
  info: PropTypes.bool,
  setInfo: PropTypes.func,
};
```
