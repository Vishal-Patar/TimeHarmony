import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Tooltip,
} from "@mui/material";
import { useTheme } from "../../theme";
import { MenuItems } from "../MenuItems";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { DrawerHeader, StyledDrawer } from "./style";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { closeDrawer, openDrawer } from "../../features/drawer/drawerSlice";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExtensionOutlinedIcon from "@mui/icons-material/ExtensionOutlined";
import { ReactNode } from "react";

interface ListItemsProps {
  label: string;
  targetLink: string;
  icon: ReactNode;
  mainMenu?: boolean;
  childMenu?: boolean;
  onClick?: () => void;
}

const AppSidebar = () => {
  const theme = useTheme();
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isDrawerOpen = useSelector((state: any) => state.drawer.isDrawerOpen);

  const handleMenuItemClick = (target: string) => {
    navigate(target ?? "#");
  };

  const ListItems = ({
    label,
    targetLink,
    icon,
    childMenu,
    mainMenu,
    onClick,
  }: ListItemsProps) => {
    return (
      <Tooltip title={isDrawerOpen ? "" : label} arrow placement="right">
        <ListItemButton
          sx={{
            minHeight: 48,
            justifyContent: isDrawerOpen ? "initial" : "center",
            px: 2.5,
            backgroundColor:
              pathname === targetLink
                ? theme.customColor.sidebar.activeBackground
                : "inherit",
            "&:hover": {
              backgroundColor:
                pathname === targetLink
                  ? theme.customColor.sidebar.activeBackground
                  : theme.customColor.sidebar.hoverBackground,
            },
            ...(mainMenu
              ? {
                  paddingRight: isDrawerOpen ? 2.5 : "0px",
                }
              : {}),
            ...(childMenu
              ? {
                  paddingLeft: isDrawerOpen ? "40px" : 2.5,
                  backgroundColor:
                    pathname === targetLink
                      ? theme.customColor.sidebar.subMenuActiveBackground
                      : "inherit",
                  "&:hover": {
                    backgroundColor:
                      pathname === targetLink
                        ? theme.customColor.sidebar.subMenuActiveBackground
                        : theme.customColor.sidebar.hoverBackground,
                  },
                }
              : {}),
          }}
          onClick={() => {
            if (onClick) {
              onClick();
              return;
            }
            if (!targetLink) return;
            handleMenuItemClick(targetLink);
          }}
        >
          <ListItemIcon
            sx={{
              minWidth: 0,
              mr: isDrawerOpen ? 3 : "auto",
              justifyContent: "center",
            }}
          >
            {icon ?? (
              <ExtensionOutlinedIcon
                style={{
                  color: theme.customColor.sidebar.icon,
                }}
              />
            )}
          </ListItemIcon>
          {isDrawerOpen && (
            <ListItemText
              primary={label}
              sx={{
                opacity: isDrawerOpen ? 1 : 0,
                color: theme.customColor.sidebar.text,
              }}
            />
          )}
        </ListItemButton>
      </Tooltip>
    );
  };

  return (
    <StyledDrawer
      variant="permanent"
      open={isDrawerOpen}
      PaperProps={{
        sx: {
          backgroundColor: theme.customColor.sidebar.background,
        },
      }}
    >
      <DrawerHeader>
        <IconButton
          onClick={() =>
            isDrawerOpen ? dispatch(closeDrawer()) : dispatch(openDrawer())
          }
        >
          <ChevronRightIcon
            style={{
              color: theme.customColor.sidebar.icon,
            }}
          />
        </IconButton>
      </DrawerHeader>

      <Divider />

      <List>
        {MenuItems().map(
          (
            {
              name,
              icon,
              label,
              targetLink,
              submenu,
              activeBasePath,
              sectionId,
            },
            index
          ) => (
            <ListItem
              key={`${name}-${index}`}
              disablePadding
              sx={{ display: "block" }}
            >
              {submenu?.length ? (
                <Accordion
                  style={{
                    backgroundColor: theme.customColor.sidebar.background,
                  }}
                >
                  <AccordionSummary
                    expandIcon={
                      <ExpandMoreIcon
                        style={{
                          color: theme.customColor.sidebar.icon,
                        }}
                      />
                    }
                    aria-controls="panel1-content"
                    id="panel1-header"
                    sx={{
                      padding: "0px",
                      margin: 0,
                      backgroundColor: pathname.includes(activeBasePath ?? "")
                        ? theme.customColor.sidebar.activeBackground
                        : "inherit",
                      "& .MuiAccordionSummary-content": {
                        margin: 0,
                      },
                      "& .MuiAccordionSummary-content.Mui-expanded": {
                        margin: 0,
                      },
                      "&:hover": {
                        backgroundColor:
                          pathname === activeBasePath
                            ? theme.customColor.sidebar.activeBackground
                            : theme.customColor.sidebar.hoverBackground,
                      },
                    }}
                  >
                    <ListItems
                      icon={icon}
                      label={label}
                      targetLink={targetLink}
                      mainMenu
                    />
                  </AccordionSummary>
                  <AccordionDetails
                    style={{
                      padding: "0px",
                    }}
                  >
                    {submenu.map(
                      (
                        {
                          label: submenuLabel,
                          name: submenuName,
                          targetLink: submenuTarget,
                          icon: submenuIcon,
                        },
                        submenuIndex
                      ) => (
                        <ListItems
                          icon={submenuIcon}
                          label={submenuLabel}
                          targetLink={submenuTarget}
                          childMenu
                          key={`${submenuName}-${index}-${submenuIndex}`}
                        />
                      )
                    )}
                  </AccordionDetails>
                </Accordion>
              ) : (
                <ListItems icon={icon} label={label} targetLink={targetLink} />
              )}
            </ListItem>
          )
        )}
      </List>
    </StyledDrawer>
  );
};

export default AppSidebar;
