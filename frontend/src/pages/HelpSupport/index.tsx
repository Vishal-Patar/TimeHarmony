import React from 'react';
import { Box, Typography, Divider, List, ListItem, ListItemAvatar, Avatar, ListItemText } from '@mui/material';
import { EmailOutlined, LockResetOutlined, QuestionAnswerOutlined } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import routes from '../../router/routes';
import BeachAccessIcon from '@mui/icons-material/BeachAccess';

const SUPPORT_MAIL = 'vishalpatar92@gmail.com';

const HelpSupport = () => {
  return (
    <Box p={4}>
      <Typography variant="h4" gutterBottom>
        Help & Support
      </Typography>
      <Divider />

      <Box mt={4}>
        <Typography variant="h5" gutterBottom sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
          Frequently Asked Questions (FAQs) <QuestionAnswerOutlined />
        </Typography>
        <Typography variant="body1">
          Here are some frequently asked questions about TimeHarmony:
        </Typography>
        <List>
          <ListItem>
            <ListItemAvatar>
              <Avatar>
                <LockResetOutlined />
              </Avatar>
            </ListItemAvatar>
            <ListItemText
              primary="How do I reset my password?"
              secondary={<div>
                If you've forgotten your password, you can reset it by contacting administrator
              </div>}
            />
          </ListItem>
          <ListItem>
            <ListItemAvatar>
              <Avatar>
                <BeachAccessIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText
              primary="How do I apply for leave?"
              secondary={<div>
                To apply for leave, log in to your account and navigate to the <Link to={routes.leave()}>Leave</Link> section. Click on the "Apply Leave" button and fill out the required information, including the start date, end date, leave type, and reason for leave. Then, submit your application for approval.
              </div>}
            />
          </ListItem>
        </List>
      </Box>

      <Box mt={4}>
        <Typography variant="h5" gutterBottom sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
          Contact Us <EmailOutlined color='info' />
        </Typography>
        <Typography variant="body1" mb={1}>
          Need further assistance? Feel free to reach out to our support team:
        </Typography>
        <Typography variant="body1" sx={{ display: 'flex', gap: 2, alignItems: 'center' }} >
          <EmailOutlined color='info' /><a href={`mailto:${SUPPORT_MAIL}`}>{SUPPORT_MAIL}</a>
        </Typography>
      </Box>
    </Box>
  );
};

export default HelpSupport;
