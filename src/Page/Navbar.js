<Dropzone onDrop={acceptedFiles => (acceptedFiles)}>
                        {({ getRootProps, getInputProps }) => (
                            <div {...getRootProps()}>
                                <input {...getInputProps()} />
                                <div className="img-drop">
                                    <div className="drop  d-flex flex-column justify-content-center align-items-center">
                                        <div className="drop-icon">
                                            <ArrowDownwardIcon className="text-white fs-3 fw-bold" />
                                        </div>
                                        <div className='fs-6 drop_txt bold'>Drag and drop your files here</div>
                                        <span className='text-second'>10MB max file size </span>
                                    </div>
                                </div>
                            </div>
                        )}
                    </Dropzone>