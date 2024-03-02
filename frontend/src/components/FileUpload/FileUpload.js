import DownloadIcon from '@mui/icons-material/Download';
import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import InputAdornment from '@mui/material/InputAdornment';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';

export default function FileUpload({ onUpload }) {
  return (
    <ListItemButton component="label">
      <ListItemIcon>
        <UploadFileIcon />
      </ListItemIcon>
      <ListItemText primary="Upload" />
      <input
        id="data-file-input"
        className="input-file"
        accept=".csv"
        type="file"
        hidden
        onChange={e => onUpload(e.target.files[0])}
      />
    </ListItemButton>
    /*<FormControl variant="standard">
      <InputLabel htmlFor="data-file-input">
        {label}
      </InputLabel>
      <Input
        id="data-file-input"
        type="file"
        className="input-file"
        accept=".csv"
        startAdornment={
          <InputAdornment position="start">
            <DownloadIcon style={{ color: '#38b6ff' }} sx={{ fontSize: 25 }} />
          </InputAdornment>
        }
        onChange={e => onUpload(e.target.files[0])}
      />
    </FormControl>*/
  )
}
