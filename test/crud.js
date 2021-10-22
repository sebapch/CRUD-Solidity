const Crud = artifacts.require('Crud');

contract('Crud', () => {
	let crud = null;
	before(async() => {
		crud = await Crud.deployed();
	});

	it('Should create a new user', async() => {
		await crud.create('Franco');
		const user = await crud.read(1);
		assert(user[0].toNumber() === 1 );
		assert(user[1] === 'Franco');
	});

	it('Should update the user', async() => {
		await crud.update(1, 'Beto');
		const user = await crud.read(1);
		assert(user[0].toNumber() === 1 );
		assert(user[1] === 'Beto');		
	});

	it('Should not update non-existing user', async() =>{
		try{
			await crud.update(2, 'Aron');
		} catch(e) {
			assert(e.message.includes('User does not exist!'));
			return;
		}
		assert(false);
	});

	it('Should delete an user in the Smart Contract', async() => {
		await crud.destroy(1);
		try{
			await crud.read(1);
		}catch (e){
			assert(e.message.includes('User does not exist!'));
			return;
		}
		assert(false);
	});

	it('Should not destroy a non extisting user', async() => {
		try{
			await crud.destroy(10);
		}catch(e){
			assert(e.message.includes('User does not exist!'));
			return;			
		}
		assert(false);
	})
});
