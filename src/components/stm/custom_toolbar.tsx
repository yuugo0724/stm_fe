import React from 'react';
import { Stm } from 'src/interfaces/stm';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import CloudDownloadIcon from '@mui/icons-material/CloudDownload';
import AddBoxIcon from '@mui/icons-material/AddBox'; // データ追加アイコン
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline'; // データ削除アイコン
import CloseIcon from '@mui/icons-material/Close'; // 編集モード終了アイコン
import { useRouter } from 'next/router'; // Next.jsのルーターフックをインポート
import { useGridApi } from './data_grid';
import Box from '@mui/material/Box'; // MUIのBoxコンポーネントをインポート
import { styled, alpha } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search'; // 検索アイコンをインポート

// スタイル定義
const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.black, 0.05), // 背景色を薄い灰色に設定
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.black, 0.1), // ホバー時の背景色を少し濃い灰色に設定
  },
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: 0, // ここを0に変更して、左にマージンが入らないようにします
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  paddingLeft: theme.spacing(0), // この値を0に変更して左端に移動
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(2.5)})`,
    width: '30ch', // 常に拡大された状態の幅を指定
  },
}));

interface CustomToolbarProps {
  editMode: boolean;
  setEditMode: (editMode: boolean) => void;
  selectedData: Stm[];
  onDelete: (selectedData: Stm[]) => void;
}

const CustomToolbar = ({ editMode, setEditMode, selectedData, onDelete }: CustomToolbarProps) => {
  const { apiRef } = useGridApi();
  const router = useRouter();

  const toggleEditMode = () => {
    setEditMode(!editMode);
  };

  const handleAddClick = () => {
    router.push('/stm/add_stm_data');
  };

  return (
    <Box sx={{ justifyContent: 'space-between', pt: 0, display: 'flex' }}>
      {!editMode && (
        <>
          <Search>
            <SearchIconWrapper>
              <IconButton>
                <SearchIcon />
              </IconButton>
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ 'aria-label': 'search' }}
            />
          </Search>
          <div style={{ display: 'flex' }}>
            <IconButton onClick={toggleEditMode}>
              <EditIcon />
            </IconButton>
            <IconButton>
              <CloudUploadIcon />
            </IconButton>
            <IconButton>
              <CloudDownloadIcon />
            </IconButton>
          </div>
        </>
      )}
      {editMode && (
        <div style={{ display: 'flex', justifyContent: 'flex-end', width: '100%' }}>
          <IconButton onClick={toggleEditMode}>
            <CloseIcon /> {/* 編集モード終了 */}
          </IconButton>
          <IconButton onClick={handleAddClick}>
            <AddBoxIcon /> {/* データ追加 */}
          </IconButton>
          <IconButton onClick={() => onDelete(selectedData)}>
            <DeleteOutlineIcon style={{ color: selectedData.length > 0 ? 'red' : 'inherit' }} />
          </IconButton>
        </div>
      )}
    </Box>
  );
};

export default CustomToolbar;