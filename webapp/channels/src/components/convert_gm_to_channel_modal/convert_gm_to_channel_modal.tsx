// Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import React, {useCallback, useState} from "react";
import {GenericModal} from "@mattermost/components";
import {useIntl} from "react-intl";

import './convert_gm_to_channel_modal.scss';
import WarningTextSection from "components/convert_gm_to_channel_modal/warning_text_section";

import ChannelNameFormField from "components/channel_name_form_field/chanenl_name_form_field";
import {Channel} from "@mattermost/types/channels";
import {Actions} from "components/convert_gm_to_channel_modal/index";
import {ModalIdentifiers} from "utils/constants";

export type Props = {
    onExited: () => void,
    channel: Channel,
    actions: Actions
}

const ConvertGmToChannelModal = (props: Props) => {
    const intl = useIntl()
    const {formatMessage} = intl

    const [show, setShow] = useState<boolean>(true)

    const onHide = useCallback(() => {
        setShow(false);
    }, [])

    const [channelName, setChannelName] = useState<string>('');

    const handleChannelNameChange = useCallback((newName: string) => {
        setChannelName(newName);
    }, [])

    const channelMemberNames = props.channel.display_name.split(',')

    const handleCancel = useCallback(() => {
        props.actions.closeModal(ModalIdentifiers.CONVERT_GM_TO_CHANNEL);
    }, [])

    return (
        <GenericModal
            id='convert-gm-to-channel-modal'
            className='convert-gm-to-channel-modal'
            modalHeaderText={formatMessage({id: 'sidebar_left.sidebar_channel_modal.header', defaultMessage: 'Convert to Private Channel'})}
            confirmButtonText={formatMessage({id: 'sidebar_left.sidebar_channel_modal.confirmation_text', defaultMessage: 'Convert to private channel'})}
            cancelButtonText={formatMessage({id: 'channel_modal.cancel', defaultMessage: 'Cancel'})}
            isDeleteModal={true}
            compassDesign={true}
            handleCancel={handleCancel}
            handleConfirm={() => {}}
            onExited={handleCancel}

        >
            <div className='convert-gm-to-channel-modal-body'>
                <WarningTextSection channelMemberNames={channelMemberNames}/>
                <ChannelNameFormField
                    value={channelName}
                    name='convert-gm-to-channel-modal-channel-name'
                    placeholder={formatMessage({id: 'sidebar_left.sidebar_channel_modal.channel_name_placeholder', defaultMessage: 'Enter a name for the channel'})}
                    onDisplayNameChange={handleChannelNameChange}
                />
            </div>
        </GenericModal>
    )
}

export default ConvertGmToChannelModal
