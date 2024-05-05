import { ContactSupportOutlined } from "@mui/icons-material";
import { Box } from "@mui/material";

const NoLeaveMessage = () => {
    return (
        <Box
            sx={{
                textAlign: 'center',
                backgroundColor: '#f7f7f7',
                padding: '20px',
                borderRadius: '8px',
                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
            }}
        >
            <ContactSupportOutlined sx={{ fontSize: 64, color: '#3f51b5' }} />
            <Box sx={{ mt: 2, fontSize: 24, fontWeight: 'bold', color: '#333' }}>
                No Leave Available!
            </Box>
            <Box sx={{ mt: 1, fontSize: 16, color: '#666' }}>
                Please contact your administrator.
            </Box>
        </Box>
    );
};

export default NoLeaveMessage;
