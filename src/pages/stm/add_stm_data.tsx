import React, { useState } from 'react';
import withAuth from 'src/components/hoc/with_auth';
import { useRouter } from 'next/router';
import { User } from 'src/interfaces/user/response_user';
import { StmCreate } from 'src/interfaces/stm/response_stm';
import stmApi from 'src/pages/api/stm';
import { Button, TextField, Container, Box, Grid, Paper, Typography, Divider, MenuItem } from '@mui/material';
import { fetchAddressFromPostalCode } from 'src/utils/addressUtils'; // 関数をインポート

const CreateStmPage: React.FC<User> = ({ username }) => {
  const [formData, setFormData] = useState<StmCreate>({
    // 初期値を設定
    address: '',
    age: 0,
    annual_income: 0,
    annual_premium: 0,
    annualized_premium_equivalent: 0,
    application_date: '',
    contact_information: '',
    contract_completion_date: '',
    contract_type: '',
    date_of_birth: '',
    first_interview_date: '',
    last_name: '',
    first_name: '',
    last_name_kana: '',
    first_name_kana: '',
    gender: '',
    household: '',
    insurance_policy_end_date: '',
    insurance_policy_start_date: '',
    insurance_premium: 0,
    insurance_type: '',
    number_of_visits: 0,
    payment_method: '',
    postal_code: '',
    security_number: '',
    status: '',
    whole_life_insurance_flag: false,
  });
  const router = useRouter();

  const handlePostalCodeChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    // ハイフンを除去して純粋な数字のみを取得
    const sanitizedValue = value.replace(/-/g, '');
    if (sanitizedValue.length === 7) { // 日本の郵便番号は7桁
      const address = await fetchAddressFromPostalCode(sanitizedValue);
      setFormData({ ...formData, address });
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    if (name === 'postal_code') {
      handlePostalCodeChange(e);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await stmApi.stmCreate(username as string, formData);
      router.push('/stm'); // 成功したらSTMのリストページにリダイレクト
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Container maxWidth="lg" style={{ padding: '24px' }}>
      <Grid container spacing={3} component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
        <Grid item xs={12} md={6}>
          <Box display="flex" flexDirection="column" height="100%">
            <Paper style={{ padding: '20px', flexGrow: 1, overflow: 'hidden' }}>
              <Box display="flex" justifyContent="space-between" alignItems="center">
                <Typography variant="h4" gutterBottom>個人情報</Typography>
              </Box>
              <Divider />
              <Grid container spacing={2} alignItems="stretch" style={{ marginTop: '10px' }}>
                {/* 個人情報 */}
                <Grid item xs={3} style={{ display: 'flex', alignItems: 'center', minHeight: '64px' }}>
                  <Typography>氏名：</Typography>
                </Grid>
                <Grid item xs={9} style={{ display: 'flex', alignItems: 'center', minHeight: '64px' }}>
                  <Box display="flex" gap={2}>
                    <TextField
                      fullWidth
                      size="small"
                      label="姓"
                      name="last_name"
                      onChange={handleChange}
                    />
                    <TextField
                      fullWidth
                      size="small"
                      label="名"
                      name="first_name"
                      onChange={handleChange}
                    />
                  </Box>
                </Grid>
                <Grid item xs={3} style={{ display: 'flex', alignItems: 'center', minHeight: '64px' }}>
                  <Typography>フリガナ：</Typography>
                </Grid>
                <Grid item xs={9} style={{ display: 'flex', alignItems: 'center', minHeight: '64px' }}>
                  <Box display="flex" gap={2}>
                    <TextField
                      fullWidth
                      size="small"
                      label="セイ"
                      name="last_name_kana"
                      onChange={handleChange}
                    />
                    <TextField
                      fullWidth
                      size="small"
                      label="メイ"
                      name="first_name_kana"
                      onChange={handleChange}
                    />
                  </Box>
                </Grid>
                <Grid item xs={3} style={{ display: 'flex', alignItems: 'center', minHeight: '64px' }}>
                  <Typography>年齢：</Typography>
                </Grid>
                <Grid item xs={9} style={{ display: 'flex', alignItems: 'center', minHeight: '64px' }}>
                  <Box display="flex" gap={2}>
                    <TextField
                      fullWidth
                      size="small"
                      label="年齢"
                      type="number"
                      name="age"
                      onChange={handleChange}
                    />
                    <TextField
                      fullWidth
                      size="small"
                      label="生年月日"
                      name="date_of_birth"
                      type="date"
                      InputLabelProps={{
                        shrink: true,
                      }}
                      onChange={handleChange}
                    />
                  </Box>
                </Grid>
                <Grid item xs={3} style={{ display: 'flex', alignItems: 'center', minHeight: '64px' }}>
                  <Typography>性別：</Typography>
                </Grid>
                <Grid item xs={9} style={{ display: 'flex', alignItems: 'center', minHeight: '64px' }}> {/* minHeightを設定 */}
                  <TextField
                    select
                    SelectProps={{ native: true }}
                    fullWidth
                    size="small"
                    label="性別"
                    name="gender"
                    onChange={handleChange}
                  >
                    <option value=""></option>
                    <option value="男性">男性</option>
                    <option value="女性">女性</option>
                    <option value="その他">その他</option>
                  </TextField>
                </Grid>
              </Grid>
            </Paper>
          </Box>
        </Grid>
        {/* 連絡先情報 */}
        <Grid item xs={12} md={6}>
          <Box display="flex" flexDirection="column" height="100%">
            <Paper style={{ padding: '20px', flexGrow: 1, overflow: 'hidden' }}>
              <Box display="flex" justifyContent="space-between" alignItems="center">
                <Typography variant="h4" gutterBottom>連絡先情報</Typography>
              </Box>
              <Divider />
              <Grid container spacing={2} style={{ marginTop: '10px', alignItems: 'center' }}>
                <Grid item xs={3} style={{ display: 'flex', alignItems: 'center', minHeight: '64px' }}>
                  <Typography>郵便番号：</Typography>
                </Grid>
                <Grid item xs={9} style={{ display: 'flex', alignItems: 'center', minHeight: '64px' }}>
                  <TextField
                    fullWidth
                    size="small"
                    label="郵便番号"
                    name="postal_code"
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={3} style={{ display: 'flex', alignItems: 'center', minHeight: '64px' }}>
                  <Typography>住所：</Typography>
                </Grid>
                <Grid item xs={9} style={{ display: 'flex', alignItems: 'center', minHeight: '64px' }}>
                  <TextField
                    fullWidth
                    size="small"
                    label="住所"
                    name="address"
                    value={formData.address}
                    autoComplete="address"
                    autoFocus
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={3} style={{ display: 'flex', alignItems: 'center', minHeight: '64px' }}>
                  <Typography>連絡先：</Typography>
                </Grid>
                <Grid item xs={9} style={{ display: 'flex', alignItems: 'center', minHeight: '64px' }}>
                  <TextField
                    fullWidth
                    size="small"
                    label="連絡先"
                    name="contact_information"
                    onChange={handleChange}
                  />
                </Grid>
              </Grid>
            </Paper>
          </Box>
        </Grid>
        {/* 契約情報 */}
        <Grid item xs={12} md={6}>
          <Box display="flex" flexDirection="column" height="100%">
            <Paper style={{ padding: '20px', flexGrow: 1, overflow: 'hidden' }}>
              <Box display="flex" justifyContent="space-between" alignItems="center">
                <Typography variant="h4" gutterBottom>契約情報</Typography>
              </Box>
              <Divider />
              <Grid container spacing={2} style={{ marginTop: '10px', alignItems: 'center' }}>
                <Grid item xs={3} style={{ display: 'flex', alignItems: 'center', minHeight: '64px' }}>
                  <Typography>申込日：</Typography>
                </Grid>
                <Grid item xs={9} style={{ display: 'flex', alignItems: 'center', minHeight: '64px' }}>
                  <TextField
                    fullWidth
                    size="small"
                    label="申込日"
                    name="application_date"
                    type="date"
                    InputLabelProps={{
                      shrink: true,
                    }}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={3} style={{ display: 'flex', alignItems: 'center', minHeight: '64px' }}>
                  <Typography>契約完了日：</Typography>
                </Grid>
                <Grid item xs={9} style={{ display: 'flex', alignItems: 'center', minHeight: '64px' }}>
                  <TextField
                    fullWidth
                    size="small"
                    label="契約完了日"
                    name="contract_completion_date"
                    type="date"
                    InputLabelProps={{
                      shrink: true,
                    }}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={3} style={{ display: 'flex', alignItems: 'center', minHeight: '64px' }}>
                  <Typography>契約タイプ：</Typography>
                </Grid>
                <Grid item xs={9} style={{ display: 'flex', alignItems: 'center', minHeight: '64px' }}>
                  <TextField
                    fullWidth
                    size="small"
                    label="契約タイプ"
                    name="contract_type"
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={3} style={{ display: 'flex', alignItems: 'center', minHeight: '64px' }}>
                  <Typography>保険種別：</Typography>
                </Grid>
                <Grid item xs={9} style={{ display: 'flex', alignItems: 'center', minHeight: '64px' }}>
                  <TextField
                    fullWidth
                    size="small"
                    label="保険種別"
                    name="insurance_type"
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={3} style={{ display: 'flex', alignItems: 'center', minHeight: '64px' }}>
                  <Typography>証券番号：</Typography>
                </Grid>
                <Grid item xs={9} style={{ display: 'flex', alignItems: 'center', minHeight: '64px' }}>
                  <TextField
                    fullWidth
                    size="small"
                    label="証券番号"
                    name="security_number"
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={3} style={{ display: 'flex', alignItems: 'center', minHeight: '64px' }}>
                  <Typography>保険期間：</Typography>
                </Grid>
                <Grid item xs={9} style={{ display: 'flex', alignItems: 'center', minHeight: '64px' }}>
                  <Box display="flex" gap={2}>
                    <TextField
                      fullWidth
                      size="small"
                      label="保険開始日"
                      name="insurance_policy_start_date"
                      type="date"
                      InputLabelProps={{
                        shrink: true,
                      }}
                      onChange={handleChange}
                    />
                    <TextField
                      fullWidth
                      size="small"
                      label="保険終了日"
                      name="insurance_policy_end_date"
                      type="date"
                      InputLabelProps={{
                        shrink: true,
                      }}
                      onChange={handleChange}
                    />
                  </Box>
                </Grid>
                <Grid item xs={3} style={{ display: 'flex', alignItems: 'center', minHeight: '64px' }}>
                  <Typography>保険料：</Typography>
                </Grid>
                <Grid item xs={9} style={{ display: 'flex', alignItems: 'center', minHeight: '64px' }}>
                  <Box display="flex" gap={2}>
                    <TextField
                      fullWidth
                      size="small"
                      label="保険料"
                      name="insurance_premium"
                      type="number"
                      onChange={handleChange}
                    />
                    <TextField
                      fullWidth
                      size="small"
                      label="支払方法"
                      name="payment_method"
                      onChange={handleChange}
                    />
                  </Box>
                </Grid>
              </Grid>
            </Paper>
          </Box>
        </Grid>
        {/* 営業情報 */}
        <Grid item xs={12} md={6}>
          <Box display="flex" flexDirection="column" height="100%">
            <Paper style={{ padding: '20px', flexGrow: 1, overflow: 'hidden' }}>
              <Box display="flex" justifyContent="space-between" alignItems="center">
                <Typography variant="h4" gutterBottom>営業情報</Typography>
              </Box>
              <Divider />
              <Grid container spacing={2} style={{ marginTop: '10px', alignItems: 'center' }}>
                <Grid item xs={3} style={{ display: 'flex', alignItems: 'center', minHeight: '64px' }}>
                  <Typography>初回面談日：</Typography>
                </Grid>
                <Grid item xs={9} style={{ display: 'flex', alignItems: 'center', minHeight: '64px' }}>
                  <TextField
                    fullWidth
                    size="small"
                    label="初回面談日"
                    name="first_interview_date"
                    type="date"
                    InputLabelProps={{
                      shrink: true,
                    }}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={3} style={{ display: 'flex', alignItems: 'center', minHeight: '64px' }}>
                  <Typography>AP：</Typography>
                </Grid>
                <Grid item xs={9} style={{ display: 'flex', alignItems: 'center', minHeight: '64px' }}>
                  <TextField
                    fullWidth
                    size="small"
                    label="AP"
                    name="annual_premium"
                    type="number"
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={3} style={{ display: 'flex', alignItems: 'center', minHeight: '64px' }}>
                  <Typography>AC：</Typography>
                </Grid>
                <Grid item xs={9} style={{ display: 'flex', alignItems: 'center', minHeight: '64px' }}>
                  <TextField
                    fullWidth
                    size="small"
                    label="AC"
                    name="annualized_premium_equivalent"
                    type="number"
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={3} style={{ display: 'flex', alignItems: 'center', minHeight: '64px' }}>
                  <Typography>訪問回数：</Typography>
                </Grid>
                <Grid item xs={9} style={{ display: 'flex', alignItems: 'center', minHeight: '64px' }}>
                  <TextField
                    fullWidth
                    size="small"
                    label="訪問回数"
                    name="number_of_visits"
                    type="number"
                    onChange={handleChange}
                  />
                </Grid>
              </Grid>
            </Paper>
          </Box>
        </Grid>
        {/* 営業情報 */}
        <Grid item xs={12} md={6}>
          <Box display="flex" flexDirection="column" height="100%">
            <Paper style={{ padding: '20px', flexGrow: 1, overflow: 'hidden' }}>
              <Box display="flex" justifyContent="space-between" alignItems="center">
                <Typography variant="h4" gutterBottom>その他</Typography>
              </Box>
              <Divider />
              <Grid container spacing={2} style={{ marginTop: '10px', alignItems: 'center' }}>
                <Grid item xs={3} style={{ display: 'flex', alignItems: 'center', minHeight: '64px' }}>
                  <Typography>年収：</Typography>
                </Grid>
                <Grid item xs={9} style={{ display: 'flex', alignItems: 'center', minHeight: '64px' }}>
                  <TextField
                    fullWidth
                    size="small"
                    label="年収"
                    name="annual_income"
                    type="number"
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={3} style={{ display: 'flex', alignItems: 'center', minHeight: '64px' }}>
                  <Typography>世帯：</Typography>
                </Grid>
                <Grid item xs={9} style={{ display: 'flex', alignItems: 'center', minHeight: '64px' }}>
                  <TextField
                    fullWidth
                    size="small"
                    label="世帯"
                    name="household"
                    type="number"
                    onChange={handleChange}
                  />
                </Grid>
              </Grid>
            </Paper>
          </Box>
        </Grid>
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
        >
          送信
        </Button>
      </Grid >

    </Container >
  );
};

export default withAuth(CreateStmPage);
