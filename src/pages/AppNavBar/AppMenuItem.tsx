import * as React from 'react';
import PropTypes from 'prop-types'
import IconExpandLess from '@material-ui/icons/ExpandLess'
import IconExpandMore from '@material-ui/icons/ExpandMore'
import AppMenuItemComponent from './AppMenuItemComponent';
import { Collapse, Divider, List, ListItemIcon, ListItemText } from '@mui/material';


// React runtime PropTypes
export const AppMenuItemPropTypes = {
    name: PropTypes.string.isRequired,
    link: PropTypes.string,
    Icon: PropTypes.elementType,
    items: PropTypes.array,
    sx: PropTypes.object,
}

// TypeScript compile-time props type, infered from propTypes
// https://dev.to/busypeoples/notes-on-typescript-inferring-react-proptypes-1g88
type AppMenuItemPropTypes = PropTypes.InferProps<typeof AppMenuItemPropTypes>
type AppMenuItemPropsWithoutItems = Omit<AppMenuItemPropTypes, 'items'>


export type AppMenuItemProps = AppMenuItemPropsWithoutItems & {
    items?: AppMenuItemProps[]
}


const AppMenuItem = (props: AppMenuItemProps) => {


    const { name, link, sx, Icon, items = [] } = props
    const isExpandable = items && items.length > 0
    const [open, setOpen] = React.useState(false);

    function handleClick() {
        setOpen(!open)
    }



    const MenuItemRoot = (
        <AppMenuItemComponent sx={sx}  link={link} onClick={handleClick} >
        {/* Display an icon if any */}
        {!!Icon && (
          <ListItemIcon >
            <Icon />
          </ListItemIcon>
        )}
        <ListItemText primary={name} inset={!Icon} />
        {/* Display the expand menu if the item has children */}
        {isExpandable && !open && <IconExpandMore />}
        {isExpandable && open && <IconExpandLess />}
      </AppMenuItemComponent>
    )

    const MenuItemChildren = isExpandable ? (
        <Collapse in={open} timeout="auto" unmountOnExit>
            <Divider />
            <List component="div" disablePadding>
                {items.map((item, index) => (
                    <AppMenuItem {...item} key={index} />
                ))}
            </List>
        </Collapse>
    ) : null


    return (
        <>
            {MenuItemRoot}
            {MenuItemChildren}
        </>
    )

}










export default AppMenuItem