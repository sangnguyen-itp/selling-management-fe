import React, { ChangeEvent, useState } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Alert, Box, Chip, Input, TextField, Typography } from '@mui/material';
import DownloadOutlinedIcon from '@mui/icons-material/DownloadOutlined';

import importProductsAPI from '../../api/product/importProducts';
import { HandleError } from '../../handleError';
import { Response } from "../../models/common/Response"

interface ProductImportField {
    selectedFiles: any
    message: string
    isError: boolean
    isSuccess: boolean
}

const ProductImport = () => {
    const [open, setOpen] = useState(false)

    const [selectedFile, setSelectedFile] = useState<ProductImportField>({
        selectedFiles: undefined,
        message: "",
        isError: false,
        isSuccess: false
    })

    const handleImportProduct = async () => {
        if (selectedFile.selectedFiles) {
            const uploadFile = selectedFile.selectedFiles[0]
            try {
                const response = await importProductsAPI({ file: uploadFile })
                let res = response as Response
                setSelectedFile({
                    ...selectedFile,
                    isError: false,
                    isSuccess: true,
                    message: res.msg
                })
            } catch (error) {
                let err = error as Response
                setSelectedFile({
                    ...selectedFile,
                    isError: true,
                    message: err.msg
                })
                HandleError(err)
            }
        }
        else {
            setSelectedFile({
                ...selectedFile,
                message: 'Không có file để upload'
            })
            console.log(selectedFile)
        }
    }

    const handleSelectFile = (e: ChangeEvent<HTMLInputElement>) => {
        setSelectedFile({
            ...selectedFile,
            isError: false,
            isSuccess: false,
            message: '',
            selectedFiles: e.target.files
        })
        console.log(selectedFile)
    }

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        if (selectedFile.isSuccess) {
            window.location.reload()
            setSelectedFile({
                ...selectedFile,
                isSuccess: false,
                isError: false,
                message: ''
            })
        }
    };

    return (
        <>
            <Button variant='outlined' onClick={handleClickOpen} color='success' style={{ marginLeft: 12 }}><DownloadOutlinedIcon titleAccess='Nhập từ file' /></Button>
            <Dialog
                fullScreen={false}
                open={open}
                onClose={handleClose}
                aria-labelledby="responsive-dialog-title"
            >
                <DialogTitle id="responsive-dialog-title">
                    Nhập sản phẩm từ Excel file (.xlsx)
                </DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        {selectedFile.selectedFiles !== undefined && <Chip
                            variant='outlined'
                            color='primary'
                            label={selectedFile.selectedFiles[0].name}
                        />}

                        {selectedFile.message !== '' &&
                            <Box style={{ marginTop: 10 }}>
                                {selectedFile.isError && <Alert color='error'>Lỗi file hoặc file không đúng định dạng</Alert>}
                                {selectedFile.isSuccess && <Alert color='success'>Upload file thành công</Alert>}
                                {(!selectedFile.isError && !selectedFile.isSuccess) && <Alert color='warning'>{selectedFile.message}</Alert>}
                            </Box>
                        }

                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button autoFocus>
                        <label htmlFor="contained-button-file">
                            <Input style={{ display: 'none' }} onChange={handleSelectFile} id="contained-button-file" type="file" />
                            <Button style={{ marginLeft: 5, borderRadius: "3px" }} variant="outlined" component="span">
                                Chọn tệp
                            </Button>
                        </label>
                    </Button>
                    <Button onClick={handleImportProduct} autoFocus>
                        Upload
                    </Button>
                    <Button onClick={handleClose} autoFocus>
                        Đóng
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
}

export default ProductImport