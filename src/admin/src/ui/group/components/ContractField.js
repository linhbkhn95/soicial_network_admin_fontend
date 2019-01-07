import React from 'react';
import { translate as translateDeco } from 'react-admin';

class ContractField extends React.Component {
  render() {
    const { record, translate, source } = this.props;
    const { contract } = record;
    let title, url_file;
    if (contract) {
      title = contract.title;
      url_file = contract.pdf_file_url;
    }

    if (contract && url_file)
      return (
        <div
          style={{ fontSize: '14px', color: '#006DBA' }}
          className="d-flex flex-row align-items-center"
        >
          <span
            style={{ display: 'inline-block', width: '20px', height: '20px' }}
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g clip-path="url(#clip0)">
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M2.5 -0.5H21.5V17.5C21.5 21.3523 18.3523 24.5 14.5 24.5H2.5V-0.5ZM4.5 1.5V22.5H14.5C17.2477 22.5 19.5 20.2477 19.5 17.5V1.5H4.5Z"
                  fill="#006DBA"
                />
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M16 8.5H8V6.5H16V8.5Z"
                  fill="#006DBA"
                />
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M16 12.5H8V10.5H16V12.5Z"
                  fill="#006DBA"
                />
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M14 16.5H8V14.5H14V16.5Z"
                  fill="#006DBA"
                />
              </g>
              <defs>
                <clipPath id="clip0">
                  <rect width="24" height="24" fill="white" />
                </clipPath>
              </defs>
            </svg>
          </span>

          <a
            style={{
              fontSize: '14px',
              color: '#006DBA',
              marginLeft: '5px',
              textDecoration: '',
            }}
            href={url_file}
            target="blank"
          >
            {title}
          </a>
        </div>
      );
    else return <div />;
  }
}

export default translateDeco(ContractField);
