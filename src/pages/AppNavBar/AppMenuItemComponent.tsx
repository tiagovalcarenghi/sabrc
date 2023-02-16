import ListItemButton from '@mui/material/ListItemButton';
import  React from 'react'
import { SxProps, Theme } from '@mui/material/styles';
import { Link } from 'react-router-dom';


interface AppMenuItemComponentProps {
    link?: string | null;// because the InferProps props allows alows null value        
    sx?: SxProps<Theme>;
    children?: React.ReactNode;
    onClick?: (event: React.MouseEvent<HTMLElement>) => void;
}


const AppMenuItemComponent = (props: AppMenuItemComponentProps) => {

    const { sx, onClick, link, children} = props;



    // If link is not set return the orinary ListItem
    if (!link || typeof link !== 'string') {
        return (

            <ListItemButton
                sx={sx}
                children={children}
                onClick={onClick}
            />
        )
    }


    //React.forwardRef((props, ref) => <NavLink innerRef={ref} {...props} />)
    // Return a LitItem with a link component
    return (
            <ListItemButton
                sx={sx}
                children={children}
                component={Link}
                to={link}
            />
    )



}

export default AppMenuItemComponent;