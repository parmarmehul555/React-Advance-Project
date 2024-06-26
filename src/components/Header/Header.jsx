import React from 'react';
import Container from '../container/Container';
import Logo from '../Logo';
import LogoutButton from '../Header/LogoutButton';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

export default function Header() {
  const authStatus = useSelector(state => state.auth.status);
  const navigate = useNavigate();

  const navItems = [
    {
      name: 'Home',
      slug: '/',
      active: true
    },
    {
      name: "Login",
      slug: "/login",
      active: !authStatus,
    },
    {
      name: "Signup",
      slug: "/signup",
      active: !authStatus,
    },
    {
      name: "All Posts",
      slug: "/all-posts",
      active: authStatus,
    },
    {
      name: "Add Post",
      slug: "/add-post",
      active: authStatus,
    },
  ]

  return (
    <header className='py-3 shadow bg-gray-500'>
      <Container>
        <nav className='flex'>
          <div className='me-4'>
            <Link to={'/'}>
              <Logo width='70px' />
            </Link>
          </div>
          <ul className='flex ml-auto '>
            {
              navItems.map((item, idx) =>
                item.active ? (
                  <li key={idx}>
                    <button
                      onClick={() => navigate(item.slug)}
                      className='inline-block px-6 py-2 duration-200 rounded-full hover:bg-blue-100'
                    >{item.name}</button>
                  </li>
                ) : null
              )
            }
            {authStatus && (
              <li>
                <LogoutButton />
              </li>
            )}
          </ul>
        </nav>
      </Container>
    </header>
  )
}
