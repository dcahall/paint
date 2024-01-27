import {useState} from "react";

import {Modal, Button, Input} from "antd";

export const StartModal = ({onSubmit}) => {
    const [name, setName] = useState()
    const [isOpen, setIsOpen] = useState(true)

    const onSubmitInner = () => {
        if (name) {
            setIsOpen(false)
            onSubmit(name)
        }
    }

    return (
        <Modal
            title="Введите имя"
            open={isOpen}
            okText="Войти"
            closable={false}
            footer={[
                <Button key="submit" onClick={onSubmitInner}>
                    Войти
                </Button>
            ]}
        >
            <Input placeholder='Имя' onChange={(e) => setName(e.target.value)}/>
        </Modal>
    )
}

