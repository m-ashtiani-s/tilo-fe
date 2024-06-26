'use client'

import React, { useState, useEffect } from 'react';
import { S3 } from 'aws-sdk';

const Upload = () => {
  const [file, setFile] = useState<any>(null);
  const [error, setError] = useState<any>(null);
  const [uploadLink, setUploadLink] = useState<any>(null);
  const [permanentLink, setPermanentLink] = useState<any>(null);
  const [uploadedFiles, setUploadedFiles] = useState<any>([]);
  const [allFiles, setAllFiles] = useState<any>([]);
  const [buckets, setBuckets] = useState<any>([]);
  
  const ACCESSKEY = 'vvrq61hbbpsc7u1o';                    // or process.env.LIARA_ACCESS_KEY;
  const SECRETKEY = '14776799-2995-4973-ac9d-9a4e077cf52c';                    //  or process.env.LIARA_SECRET_KEY;
  const ENDPOINT  = 'https://storage.iran.liara.space'; //   or process.env.LIARA_ENDPOINT;
  const BUCKET    = 'lotustest';                //    or process.env.LIARA_BUCKET_NAME;


  
  const fetchBuckets = async () => {
    const s3 = new S3({
      accessKeyId: ACCESSKEY,
      secretAccessKey: SECRETKEY,
      endpoint: ENDPOINT,
    });
    try {
      const response:any = await s3.listBuckets().promise();
      setBuckets(response.Buckets);
    } catch (error) {
      console.error('Error fetching buckets: ', error);
    }
  };

  const fetchAllFiles = async () => {
    const s3 = new S3({
      accessKeyId: ACCESSKEY,
      secretAccessKey: SECRETKEY,
      endpoint: ENDPOINT,
    });

    try {
      const response:any = await s3.listObjectsV2({ Bucket: BUCKET }).promise();
      setAllFiles(response.Contents);
    } catch (error) {
      console.error('Error fetching files: ', error);
    }
  };

  useEffect(() => {
    fetchBuckets();
    fetchAllFiles();
  }, [uploadLink]);

  const handleFileChange = (event:any) => {
    setFile(event.target.files[0]);
    setError(null);
    setUploadLink(null);
    setPermanentLink(null);
  };

  const handleUpload = async () => {
    try {
      if (!file) {
        setError('Please select a file');
        return;
      }

      const s3 = new S3({
        accessKeyId: ACCESSKEY,
        secretAccessKey: SECRETKEY,
        endpoint: ENDPOINT+'/ggh',
      });

      const params = {
        Bucket: BUCKET,
        Key: file.name,
        Body: file,
      };

      const response = await s3.upload(params).promise();
      const signedUrl = s3.getSignedUrl('getObject', {
        Bucket: BUCKET,
        Key: file.name,
        Expires: 3600,
      });

      setUploadLink(signedUrl);

      // Get permanent link
      const permanentSignedUrl = s3.getSignedUrl('getObject', {
        Bucket: BUCKET,
        Key: file.name,
        Expires: 31536000, // 1 year
      });
      setPermanentLink(permanentSignedUrl);

      // Update list of uploaded files
      setUploadedFiles((prevFiles:any) => [...prevFiles, response]);

      // Update list of all files
      fetchAllFiles();

    } catch (error:any) {
      setError('Error uploading file: ' + error?.message);
    }
  };

  const handleShowFiles = () => {
  };

  const handleDeleteFile = async (file:any) => {
    try {
      const s3 = new S3({
        accessKeyId: ACCESSKEY,
        secretAccessKey: SECRETKEY,
        endpoint: ENDPOINT,
      });

      await s3.deleteObject({ Bucket: BUCKET, Key: file.Key }).promise();

      // Update the list of uploaded files
      setUploadedFiles((prevFiles:any) =>
        prevFiles.filter((uploadedFile:any) => uploadedFile.Key !== file.Key)
      );

      // Update list of all files
      fetchAllFiles();

    } catch (error) {
      console.error('Error deleting file: ', error);
    }
  };

  return (
    <div className="upload-container">
      <h1>Upload File to S3</h1>
      <input type="file" onChange={handleFileChange} />
      <button className="upload-button" onClick={handleUpload} disabled={!file}>
        Upload
      </button>
      {uploadLink && (
        <h3 className="success-message">
          File uploaded successfully. Temporary Link:{' '}
          <a href={uploadLink} target="_blank" rel="noopener noreferrer">
            Temporary Link
          </a>
        </h3>
      )}
      {permanentLink && (
        <h3 className="success-message">
          Permanent Link:{' '}
          <a href={permanentLink} target="_blank" rel="noopener noreferrer">
            Permanent Link
          </a>
        </h3>
      )}
      <button className="show-files-button" onClick={handleShowFiles}>
        Show Uploaded Files
      </button>
      {uploadedFiles.length > 0 && (
        <div>
          <h2>Uploaded Files:</h2>
          <ul>
            {uploadedFiles.map((uploadedFile:any) => {
              const s3 = new S3({
                accessKeyId: ACCESSKEY,
                secretAccessKey: SECRETKEY,
                endpoint: ENDPOINT,
              });

              return (
                <li key={uploadedFile.Key}>
                  {uploadedFile.Key}{' '}
                  <a
                    href={s3.getSignedUrl('getObject', {
                      Bucket: BUCKET,
                      Key: uploadedFile.Key,
                      Expires: 3600,
                    })}
                    download
                  >
                    Download
                  </a>{' '}
                  <button onClick={() => handleDeleteFile(uploadedFile)}>
                    Delete
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      )}
      {allFiles.length > 0 && (
        <div>
          <h2>All Files:</h2>
          <ul>
            {allFiles.map((file:any) => {
              const s3 = new S3({
                accessKeyId: ACCESSKEY,
                secretAccessKey: SECRETKEY,
                endpoint: ENDPOINT,
              });

              return (
                <li key={file.Key}>
                  {file.Key}{' '}
                  <a
                    href={s3.getSignedUrl('getObject', {
                      Bucket: BUCKET,
                      Key: file.Key,
                      Expires: 3600,
                    })}
                    download
                  >
                    Download
                  </a>{' '}
                  <button onClick={() => handleDeleteFile(file)}>
                    Delete
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      )}
      {error && <p className="error-message">{error}</p>}
      <div>
        <h2>Buckets:</h2>
        <ul>
          {buckets.map((bucket:any) => (
            <li key={bucket.Name}>{bucket.Name}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};


export default Upload;