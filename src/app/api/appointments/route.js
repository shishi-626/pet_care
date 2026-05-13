import { NextResponse } from 'next/server';
import { getPool } from '../../../lib/db';

export const runtime = 'nodejs';

const validPetTypes = new Set(['猫咪', '狗狗', '其他小宠']);
const validPetSizes = new Set(['小型', '中型', '大型']);
const validPackages = new Set(['轻盈洗护', '泡泡精护', '明星造型']);
const validTimes = new Set(['10:00 - 12:00', '13:00 - 15:00', '15:30 - 17:30', '18:00 - 20:00']);

function validateAppointment(body) {
  const customerName = String(body.name || '').trim();
  const customerPhone = String(body.phone || '').trim();
  const petType = String(body.petType || '').trim();
  const petSize = String(body.petSize || '').trim();
  const servicePackage = String(body.package || '').trim();
  const appointmentDate = String(body.date || '').trim();
  const appointmentTime = String(body.time || '').trim();
  const note = String(body.note || '').trim();

  if (!customerName) return { error: '请填写主人姓名' };
  if (!/^1[3-9]\d{9}$/.test(customerPhone)) return { error: '请填写有效手机号' };
  if (!validPetTypes.has(petType)) return { error: '请选择有效宠物类型' };
  if (!validPetSizes.has(petSize)) return { error: '请选择有效宠物体型' };
  if (!validPackages.has(servicePackage)) return { error: '请选择有效服务套餐' };
  if (!/^\d{4}-\d{2}-\d{2}$/.test(appointmentDate)) return { error: '请选择预约日期' };
  if (!validTimes.has(appointmentTime)) return { error: '请选择有效预约时段' };

  return {
    data: {
      customerName,
      customerPhone,
      petType,
      petSize,
      servicePackage,
      appointmentDate,
      appointmentTime,
      note: note || null,
    },
  };
}

export async function POST(request) {
  const body = await request.json().catch(() => null);

  if (!body) {
    return NextResponse.json({ error: '请求格式不正确' }, { status: 400 });
  }

  const { data, error } = validateAppointment(body);
  if (error) {
    return NextResponse.json({ error }, { status: 400 });
  }

  try {
    const result = await getPool().query(
      `insert into public.appointments (
        customer_name,
        customer_phone,
        pet_type,
        pet_size,
        service_package,
        appointment_date,
        appointment_time,
        note
      )
      values ($1, $2, $3, $4, $5, $6, $7, $8)
      returning id`,
      [
        data.customerName,
        data.customerPhone,
        data.petType,
        data.petSize,
        data.servicePackage,
        data.appointmentDate,
        data.appointmentTime,
        data.note,
      ],
    );

    return NextResponse.json({ id: result.rows[0].id }, { status: 201 });
  } catch (error) {
    console.error('Appointment insert failed', {
      code: error.code,
      message: error.message,
      detail: error.detail,
    });

    if (error.code === '28P01') {
      return NextResponse.json({ error: '数据库连接认证失败，请检查 DATABASE_URL 的用户名和数据库密码' }, { status: 500 });
    }

    if (error.code === '42P01') {
      return NextResponse.json({ error: '预约表不存在，请先执行 database/appointments.sql' }, { status: 500 });
    }

    return NextResponse.json({ error: '预约保存失败，请稍后再试' }, { status: 500 });
  }
}
