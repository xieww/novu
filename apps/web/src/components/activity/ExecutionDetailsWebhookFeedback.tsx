import { Group } from '@mantine/core';
import styled from 'styled-components';
import { format, parseISO } from 'date-fns';
import { colors, Container, Text, Tooltip } from '../../design-system';
import { mappedWebhookStatuses } from './helpers';

const WebhookFeedbackWrapper = styled(Container)`
  align-items: center;
  display: flex;
  flex-flow: column;
  justify-content: center;
  margin: 0;
  padding: 15px 10px;
`;

const WebhookFeedbackTitle = styled(Text)`
  color: ${colors.B60};
  font-size: 12px;
  line-height: 16px;
  padding-top: 5px;
`;

const WebhookTimeStamp = ({ timeStamp }) => {
  const formattedDate = format(parseISO(timeStamp), 'dd/MM/yyyy');
  const formattedTime = format(parseISO(timeStamp), 'HH:mm:ss');

  return (
    <span>
      {formattedDate}, {formattedTime}
    </span>
  );
};

const WebhookFeedback = ({ icon, text, timeStamp }) => {
  const Icon = icon;

  return (
    <Tooltip label={<WebhookTimeStamp timeStamp={timeStamp} />}>
      <WebhookFeedbackWrapper>
        <Icon height="15px" width="15px" />
        <WebhookFeedbackTitle>{text}</WebhookFeedbackTitle>
      </WebhookFeedbackWrapper>
    </Tooltip>
  );
};

// TODO: Render based on API response. So far we do placeholders.
export const ExecutionDetailsWebhookFeedback = ({ executionDetails }) => {
  const getWebhookIcons = () => {
    const icons: JSX.Element[] = [];

    executionDetails.map((detail) => {
      const webhookStatus = detail?.webhookStatus;

      if (webhookStatus) {
        Object.keys(mappedWebhookStatuses).forEach((key) => {
          const status = mappedWebhookStatuses[key].status;
          const icon = mappedWebhookStatuses[key].icon;
          const label = mappedWebhookStatuses[key].label;
          if (status.includes(webhookStatus.toLowerCase())) {
            icons.push(<WebhookFeedback icon={icon} text={label} timeStamp={detail?.updatedAt} />);
          }
        });
      }
    });

    return icons;
  };

  return (
    <Group position="right" spacing="xs">
      {getWebhookIcons()}
    </Group>
  );
};
